#!/usr/bin/env python3
"""
Create a placeholder Goomba sprite sheet for testing.
This is a temporary sprite until the actual sprite_goomba.png is provided.
Format: 2 frames of 64x80 pixels arranged horizontally (total: 128x80)
"""

from PIL import Image, ImageDraw

# Create image: 2 frames of 64x80 (total 128x80)
width = 128
height = 80
img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Define colors
brown = (139, 69, 19, 255)
dark_brown = (101, 50, 14, 255)
black = (0, 0, 0, 255)
white = (255, 255, 255, 255)

def draw_goomba(x_offset, eye_offset=0):
    """Draw a simple Goomba at x_offset with optional eye offset for animation"""
    base_x = x_offset

    # Body (mushroom shape) - centered in 64x80 frame
    # Body starts at y=30 to leave room for head
    body_width = 50
    body_height = 35
    body_x = base_x + (64 - body_width) // 2
    body_y = 45

    # Draw body (rounded rectangle approximation)
    draw.ellipse([body_x, body_y, body_x + body_width, body_y + body_height],
                 fill=brown, outline=dark_brown)

    # Head (top part of mushroom)
    head_width = 45
    head_height = 25
    head_x = base_x + (64 - head_width) // 2
    head_y = 25

    # Draw head (semi-circle)
    draw.ellipse([head_x, head_y, head_x + head_width, head_y + head_height * 2],
                 fill=brown, outline=dark_brown)

    # Eyes (angry/furrowed brows)
    eye_y = 35
    left_eye_x = base_x + 18 + eye_offset
    right_eye_x = base_x + 38 + eye_offset

    # White of eyes
    draw.ellipse([left_eye_x, eye_y, left_eye_x + 8, eye_y + 8], fill=white, outline=black)
    draw.ellipse([right_eye_x, eye_y, right_eye_x + 8, eye_y + 8], fill=white, outline=black)

    # Black pupils
    draw.ellipse([left_eye_x + 2, eye_y + 2, left_eye_x + 6, eye_y + 6], fill=black)
    draw.ellipse([right_eye_x + 2, eye_y + 2, right_eye_x + 6, eye_y + 6], fill=black)

    # Eyebrows (angry look)
    draw.line([left_eye_x, eye_y - 2, left_eye_x + 8, eye_y - 4], fill=black, width=2)
    draw.line([right_eye_x, eye_y - 4, right_eye_x + 8, eye_y - 2], fill=black, width=2)

    # Feet
    foot_width = 15
    foot_height = 10
    left_foot_x = base_x + 10
    right_foot_x = base_x + 39
    foot_y = 70

    # Draw feet
    draw.ellipse([left_foot_x, foot_y, left_foot_x + foot_width, foot_y + foot_height],
                 fill=dark_brown, outline=black)
    draw.ellipse([right_foot_x, foot_y, right_foot_x + foot_width, foot_y + foot_height],
                 fill=dark_brown, outline=black)

# Frame 0: normal position
draw_goomba(0, eye_offset=0)

# Frame 1: slightly different (eyes moved for animation)
draw_goomba(64, eye_offset=1)

# Save the sprite sheet
output_path = '/tmp/gh-issue-solver-1765534866631/src/media/sprite_goomba.png'
img.save(output_path, 'PNG')
print(f"Created placeholder Goomba sprite: {output_path}")
print(f"Size: {width}x{height} (2 frames of 64x80)")
