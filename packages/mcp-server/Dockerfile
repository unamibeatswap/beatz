FROM node:20-alpine

# Add security and performance optimizations
RUN apk add --no-cache dumb-init

WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY src/ ./src/

# Create uploads directory with proper permissions
RUN mkdir -p uploads && chmod 755 uploads

# Verify critical dependencies
RUN node -e "console.log('Ethers version:', require('ethers').version)" && \
    node -e "console.log('Express loaded:', !!require('express'))" && \
    node -e "console.log('Supabase loaded:', !!require('@supabase/supabase-js'))"

# Use non-root user for security
USER node

# Expose port (Railway will map dynamically)
EXPOSE 4000

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "src/index.js"]