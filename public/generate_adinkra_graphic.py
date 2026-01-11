import matplotlib.pyplot as plt
import numpy as np

# Setup figure
fig, ax = plt.subplots(figsize=(8,8), facecolor='black')
ax.axis('off')

# Central core hexagon (QBC)
theta = np.linspace(0, 2*np.pi, 6, endpoint=False)
x = 0.5*np.cos(theta)
y = 0.5*np.sin(theta)
ax.fill(x, y, color='#00ffff', alpha=0.6)

# Four SUSY nodes around center
angles = [np.pi/4, 3*np.pi/4, 5*np.pi/4, 7*np.pi/4]
radius = 1.0
nodes = []
for angle in angles:
    nx = radius*np.cos(angle)
    ny = radius*np.sin(angle)
    nodes.append((nx, ny))
    circle = plt.Circle((nx, ny), 0.15, color='#ff00ff', alpha=0.7)
    ax.add_patch(circle)

# Connect nodes with lines
for i, (x1, y1) in enumerate(nodes):
    for j, (x2, y2) in enumerate(nodes):
        if i < j:
            ax.plot([x1, x2], [y1, y2], color='#ffffff', linewidth=1.2, alpha=0.5)

# Radial lines from center to nodes
for nx, ny in nodes:
    ax.plot([0, nx], [0, ny], color='#00ff00', linewidth=1.5, alpha=0.7)

# Golden ratio circles
phi = (1 + 5**0.5)/2
for r in [0.3, 0.3*phi, 0.3*phi**2]:
    ax.add_patch(plt.Circle((0,0), r, fill=False, linestyle='--', color='#ffff00', alpha=0.3))

# Save graphic
plt.savefig("adinkra.png", dpi=300, bbox_inches='tight', facecolor='black')
plt.close()
print("Adinkra SUSY graphic created as adinkra.png")

