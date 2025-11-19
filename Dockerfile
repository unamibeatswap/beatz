FROM node:20-alpine

WORKDIR /app

# Copy MCP server package files
COPY packages/mcp-server/package.json packages/mcp-server/
COPY packages/mcp-server/src packages/mcp-server/src/

# Install dependencies
WORKDIR /app/packages/mcp-server
RUN npm install --only=production

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 4000

# Start server
CMD ["node", "src/index.js"]