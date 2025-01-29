# Use official Node.js LTS image
FROM node:18-bullseye

# Set working directory inside the container
WORKDIR /app

# Install Yarn globally inside the container
RUN corepack enable && corepack prepare yarn@stable --activate

# Ensure the container starts with a shell for debugging
CMD ["/bin/bash"]
