import math
import numpy as np
import networkx as nx
import matplotlib.pyplot as plt

def calculate_stock_prices(S, T, sigma, n):
    """
    Calculate all possible stock prices at each time step
    
    Parameters:
    S: Initial stock price
    T: Time to expiration
    sigma: Volatility
    n: Number of steps
    
    Returns: List of lists, where each inner list contains the stock prices at that time step
    """
    if n > 12:
        print("n is too large, please choose a smaller number")
        return
    
    # Calculate up and down factors
    deltaT = T / n
    u = math.exp(sigma * math.sqrt(deltaT))
    d = 1/u
    
    # Initialize list to store prices at each step
    prices_by_step = []
    
    # Calculate prices for each step
    for step in range(n + 1):
        prices_at_step = []
        
        # At each step i, we can have 0 to i down moves
        for down_moves in range(step + 1):
            up_moves = step - down_moves
            # Calculate price using the formula: S * u^(up_moves) * d^(down_moves)
            price = S * (u ** up_moves) * (d ** down_moves)
            prices_at_step.append(price)
            
        prices_by_step.append(prices_at_step)
        
    return prices_by_step


def visualize_price_lattice(S, T, sigma, n):
    if n > 12:
        print("n is too large, please choose a smaller number")
        return
    
    # Get prices using existing function
    prices = calculate_stock_prices(S, T, sigma, n)
    
    # Create graph
    G = nx.Graph()
    pos = {}
    labels = {}
    
    # Adjust spacing based on n
    horizontal_spacing = 2.0  # Increased from 1.5
    vertical_spacing = 2.0    # Increased from 1.5
    node_size = 2000 if n <= 5 else 1500  # Smaller nodes for larger trees
    font_size = 8 if n <= 5 else 6        # Smaller font for larger trees
    
    # Add nodes and positions
    for step in range(n + 1):
        for j in range(len(prices[step])):
            node_id = f"{step},{j}"
            G.add_node(node_id)
            
            # Position nodes with extra spacing
            x = step * horizontal_spacing
            y = -(j - (len(prices[step]) - 1) / 2) * vertical_spacing
            pos[node_id] = (x, y)
            
            # Round prices to 2 decimal places
            labels[node_id] = f"${prices[step][j]:.2f}"
            
            # Add edges
            if step < n:
                G.add_edge(f"{step},{j}", f"{step+1},{j}")
                G.add_edge(f"{step},{j}", f"{step+1},{j+1}")
    
    plt.figure(figsize=(20, 12))  # Increased figure size
    
    # Draw edges first
    nx.draw_networkx_edges(G, pos, edge_color='black')
    
    # Draw nodes as rectangles
    nx.draw_networkx_nodes(G, pos,
                          node_shape='s',
                          node_color='white',
                          node_size=node_size,
                          edgecolors='black',
                          linewidths=2)
    
    # Draw labels
    nx.draw_networkx_labels(G, pos, labels,
                           font_size=font_size,
                           font_weight='bold')
    
    # Add step numbers at the top
    max_y = max(y for x, y in pos.values())
    for step in range(n + 1):
        plt.text(step * horizontal_spacing, max_y + 1.0,  # Increased top margin
                f'n={step}', 
                horizontalalignment='center',
                fontsize=10,
                fontweight='bold')
    
    plt.title(f"Binomial Price Lattice\nS={S}, σ={sigma}, T={T}, steps={n}")
    plt.axis('off')
    return plt

# Example usage
S = 18        # Initial stock price
T = 1      # 3 weeks
sigma = 0.2   # Volatility
n = 10       # Larger number of steps

# Create and show the lattice
lattice = visualize_price_lattice(S, T, sigma, n)
lattice.show()

# Print prices at each step
'''
for step, step_prices in enumerate(prices):
    print(f"\nStep {step} prices:")
    print(step_prices)
'''
'''
def binomial_option_pricing(S0, K, T, r, sigma, N, option_type='call'):
    # Calculate the time step
    dt = T / N
    # Calculate the up and down factors
    u = math.exp(sigma * math.sqrt(dt))
    d = 1 / u
    # Calculate the risk-neutral probability
    p = (math.exp(r * dt) - d) / (u - d)
    
    # Initialize asset prices at maturity
    asset_prices = [0] * (N + 1)
    for i in range(N + 1):
        asset_prices[i] = S0 * (u ** (N - i)) * (d ** i)
    
    # Initialize option values at maturity
    option_values = [0] * (N + 1)
    for i in range(N + 1):
        if option_type == 'call':
            option_values[i] = max(0, asset_prices[i] - K)
        elif option_type == 'put':
            option_values[i] = max(0, K - asset_prices[i])
    
    # Step back through the tree
    for j in range(N - 1, -1, -1):
        for i in range(j + 1):
            option_values[i] = (p * option_values[i] + (1 - p) * option_values[i + 1]) * math.exp(-r * dt)
    
    # Calculate delta
    delta = (option_values[0] - option_values[1]) / (S0 * (u - d))
    
    return option_values[0], delta

# Example usage
S0 = 100  # Current stock price
K = 100   # Strike price
T = 1     # Time to expiration in years
r = 0.05  # Risk-free interest rate
sigma = 0.2  # Volatility
N = 100   # Number of time steps
option_type = 'call'  # 'call' or 'put'

option_price, delta = binomial_option_pricing(S0, K, T, r, sigma, N, option_type)
print(f"Option Price: {option_price}")
print(f"Delta: {delta}")
'''