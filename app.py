# app.py
from flask import Flask, render_template, request, send_file
import io
import base64
from bopm import visualize_price_lattice

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        # Get parameters from form
        S = float(request.form['stock_price'])
        T = float(request.form['time']) / 52
        sigma = float(request.form['volatility'])
        n = int(request.form['steps'])
        
        # Generate plot
        lattice = visualize_price_lattice(S, T, sigma, n)
        
        # Save plot to memory
        img = io.BytesIO()
        lattice.savefig(img, format='png', bbox_inches='tight')
        img.seek(0)
        plot_url = base64.b64encode(img.getvalue()).decode()
        
        return render_template('index.html', plot_url=plot_url)
    
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)