"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  GitBranch,
  Code,
  Database,
  Settings,
  Shield,
  Zap,
  Github,
  Download,
  Eye,
  Loader2,
} from "lucide-react"

type DocType = {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  content?: string
}

const docTypes: DocType[] = [
  {
    id: "readme",
    name: "README.md",
    icon: <FileText className="w-5 h-5" />,
    description: "Main project documentation",
    content: `# Project Name

## Overview
This project is a modern web application built with cutting-edge technologies to deliver exceptional user experience.

## Features
- 🚀 Fast and responsive
- 🔒 Secure authentication
- 📱 Mobile-first design
- ⚡ Real-time updates

## Installation

\`\`\`bash
npm install
npm run dev
\`\`\`

## Usage
Start the development server and navigate to http://localhost:3000

## Contributing
Please read our contributing guidelines before submitting pull requests.

## License
MIT License - see LICENSE file for details.`,
  },
  {
    id: "architecture",
    name: "Architecture",
    icon: <GitBranch className="w-5 h-5" />,
    description: "System architecture and C4 model",
    content: `# System Architecture

## High Level Design (HLD)

This document describes the high-level architecture of our system using the C4 model.

## C4 Model - Context Diagram

\`\`\`mermaid
graph TB
    User["👤 User"]
    System["📦 GitHub Docs Agent"]
    GitHub["🐙 GitHub API"]
    OpenAI["🤖 OpenAI API"]
    
    User -->|"Provides GitHub URL"| System
    System -->|"Fetches repository data"| GitHub
    System -->|"Generates documentation"| OpenAI
    System -->|"Returns documentation"| User
\`\`\`

## Container Diagram

\`\`\`mermaid
graph TB
    subgraph "GitHub Docs Agent System"
        WebApp["🌐 Web Application<br/>(Next.js)"]
        API["🔌 API Layer<br/>(Node.js)"]
        Parser["📝 Code Parser<br/>(TypeScript)"]
        Generator["🤖 Doc Generator<br/>(AI Service)"]
    end
    
    User["👤 User"] --> WebApp
    WebApp --> API
    API --> Parser
    API --> Generator
    Parser --> GitHub["🐙 GitHub API"]
    Generator --> OpenAI["🤖 OpenAI API"]
\`\`\`

## Component Diagram

\`\`\`mermaid
graph TB
    subgraph "Web Application"
        UI["UI Components"]
        State["State Management"]
        Router["Routing"]
    end
    
    subgraph "API Layer"
        Controller["Controllers"]
        Service["Services"]
        Middleware["Middleware"]
    end
    
    subgraph "Core Services"
        RepoAnalyzer["Repository Analyzer"]
        DocGenerator["Documentation Generator"]
        TemplateEngine["Template Engine"]
    end
    
    UI --> Controller
    Controller --> Service
    Service --> RepoAnalyzer
    Service --> DocGenerator
    DocGenerator --> TemplateEngine
\`\`\`

## Technology Stack
- **Frontend**: Next.js, React, TypeScript
- **Backend**: Node.js, Express
- **AI**: OpenAI GPT-4
- **Version Control**: Git, GitHub API
- **Deployment**: Vercel`,
  },
  {
    id: "api",
    name: "API Documentation",
    icon: <Code className="w-5 h-5" />,
    description: "API endpoints and usage",
    content: `# API Documentation

## Base URL
\`https://api.github-docs-agent.com/v1\`

## Authentication
All API requests require authentication using Bearer tokens.

\`\`\`bash
Authorization: Bearer YOUR_API_TOKEN
\`\`\`

## Endpoints

### Generate Documentation
\`POST /generate\`

Generate documentation for a GitHub repository.

**Request Body:**
\`\`\`json
{
  "githubUrl": "https://github.com/user/repo",
  "docTypes": ["readme", "architecture", "api"],
  "options": {
    "includeC4Model": true,
    "includeHLD": true
  }
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "readme": "# Generated README content...",
    "architecture": "# Architecture documentation...",
    "api": "# API documentation..."
  },
  "metadata": {
    "generatedAt": "2024-01-15T10:30:00Z",
    "repository": "user/repo",
    "language": "TypeScript"
  }
}
\`\`\`

### Get Repository Info
\`GET /repository/:owner/:repo\`

Retrieve information about a GitHub repository.

**Response:**
\`\`\`json
{
  "name": "repo-name",
  "description": "Repository description",
  "language": "TypeScript",
  "stars": 1234,
  "forks": 56,
  "lastUpdated": "2024-01-15T10:30:00Z"
}
\`\`\`

## Error Handling
All errors follow the standard HTTP status codes with descriptive messages.

\`\`\`json
{
  "error": {
    "code": 400,
    "message": "Invalid GitHub URL provided",
    "details": "The URL must be a valid GitHub repository URL"
  }
}
\`\`\``,
  },
  {
    id: "database",
    name: "Database Schema",
    icon: <Database className="w-5 h-5" />,
    description: "Database structure and models",
    content: `# Database Schema

## Entity Relationship Diagram

\`\`\`mermaid
erDiagram
    User ||--o{ Project : creates
    Project ||--o{ Documentation : has
    Project ||--o{ AnalysisResult : generates
    Documentation ||--o{ Version : has
    
    User {
        string id PK
        string email
        string name
        datetime createdAt
        datetime updatedAt
    }
    
    Project {
        string id PK
        string userId FK
        string githubUrl
        string name
        string description
        string language
        datetime createdAt
        datetime updatedAt
    }
    
    Documentation {
        string id PK
        string projectId FK
        string type
        text content
        string status
        datetime createdAt
        datetime updatedAt
    }
    
    AnalysisResult {
        string id PK
        string projectId FK
        json structure
        json dependencies
        json metrics
        datetime createdAt
    }
    
    Version {
        string id PK
        string documentationId FK
        text content
        string version
        datetime createdAt
    }
\`\`\`

## Tables

### Users
Stores user account information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | VARCHAR(255) | User email address |
| name | VARCHAR(100) | User display name |
| created_at | TIMESTAMP | Account creation time |
| updated_at | TIMESTAMP | Last update time |

### Projects
Stores GitHub repository projects.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| github_url | VARCHAR(500) | Repository URL |
| name | VARCHAR(100) | Project name |
| description | TEXT | Project description |
| language | VARCHAR(50) | Primary language |
| created_at | TIMESTAMP | Project creation time |
| updated_at | TIMESTAMP | Last update time |

### Documentation
Stores generated documentation.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| project_id | UUID | Foreign key to projects |
| type | VARCHAR(50) | Documentation type |
| content | TEXT | Documentation content |
| status | VARCHAR(20) | Generation status |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update time |`,
  },
  {
    id: "deployment",
    name: "Deployment Guide",
    icon: <Settings className="w-5 h-5" />,
    description: "Deployment and configuration",
    content: `# Deployment Guide

## Prerequisites
- Node.js 18+ 
- npm or yarn
- GitHub account
- OpenAI API key

## Environment Variables

Create a \`.env.local\` file with the following variables:

\`\`\`bash
# GitHub API
GITHUB_TOKEN=your_github_token

# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# Database
DATABASE_URL=your_database_url

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
\`\`\`

## Local Development

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-org/github-docs-agent.git
cd github-docs-agent
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

## Production Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker Deployment

1. Build the Docker image:
\`\`\`bash
docker build -t github-docs-agent .
\`\`\`

2. Run the container:
\`\`\`bash
docker run -p 3000:3000 --env-file .env github-docs-agent
\`\`\`

### Manual Deployment

1. Build the application:
\`\`\`bash
npm run build
\`\`\`

2. Start the production server:
\`\`\`bash
npm start
\`\`\`

## Configuration

### GitHub API Rate Limits
- Authenticated requests: 5,000 per hour
- Unauthenticated requests: 60 per hour

### OpenAI API Limits
- Depends on your plan and usage
- Monitor usage in OpenAI dashboard

## Monitoring

Set up monitoring for:
- API response times
- Error rates
- GitHub API rate limit usage
- OpenAI API usage and costs`,
  },
  {
    id: "security",
    name: "Security Guide",
    icon: <Shield className="w-5 h-5" />,
    description: "Security best practices",
    content: `# Security Guide

## Authentication & Authorization

### API Key Management
- Store API keys in environment variables
- Never commit API keys to version control
- Rotate API keys regularly
- Use different keys for different environments

### User Authentication
- Implement OAuth 2.0 with GitHub
- Use secure session management
- Implement proper logout functionality
- Add rate limiting to prevent abuse

## Data Protection

### Input Validation
- Validate all GitHub URLs
- Sanitize user inputs
- Implement proper error handling
- Use TypeScript for type safety

### Data Storage
- Encrypt sensitive data at rest
- Use HTTPS for all communications
- Implement proper database access controls
- Regular security audits

## Security Headers

Implement the following security headers:

\`\`\`javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]
\`\`\`

## Vulnerability Management

### Regular Updates
- Keep dependencies updated
- Monitor security advisories
- Use automated dependency scanning
- Implement security testing in CI/CD

### Security Monitoring
- Log security events
- Monitor for suspicious activity
- Implement alerting for security incidents
- Regular penetration testing

## Compliance

### Data Privacy
- GDPR compliance for EU users
- Clear privacy policy
- Data retention policies
- User data deletion capabilities

### GitHub API Compliance
- Respect rate limits
- Follow GitHub's terms of service
- Proper attribution
- Handle API errors gracefully`,
  },
  {
    id: "performance",
    name: "Performance Guide",
    icon: <Zap className="w-5 h-5" />,
    description: "Performance optimization",
    content: `# Performance Guide

## Frontend Optimization

### Next.js Optimizations
- Use Next.js Image component for optimized images
- Implement proper code splitting
- Use dynamic imports for heavy components
- Enable compression and caching

### React Performance
- Use React.memo for expensive components
- Implement proper key props for lists
- Use useCallback and useMemo appropriately
- Avoid unnecessary re-renders

## Backend Optimization

### API Performance
- Implement response caching
- Use connection pooling for databases
- Optimize database queries
- Implement proper pagination

### GitHub API Optimization
- Cache repository data
- Use conditional requests (ETags)
- Implement request batching
- Monitor rate limit usage

## Caching Strategy

### Client-Side Caching
\`\`\`javascript
// SWR configuration
const fetcher = (url) => fetch(url).then(res => res.json())

function useRepository(url) {
  const { data, error } = useSWR(\`/api/repository?url=\${url}\`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 300000 // 5 minutes
  })
  
  return { repository: data, isLoading: !error && !data, error }
}
\`\`\`

### Server-Side Caching
\`\`\`javascript
// Redis caching
const redis = new Redis(process.env.REDIS_URL)

async function getCachedRepository(url) {
  const cached = await redis.get(\`repo:\${url}\`)
  if (cached) {
    return JSON.parse(cached)
  }
  
  const data = await fetchFromGitHub(url)
  await redis.setex(\`repo:\${url}\`, 3600, JSON.stringify(data)) // 1 hour
  return data
}
\`\`\`

## Performance Monitoring

### Core Web Vitals
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1

### API Monitoring
- Response time tracking
- Error rate monitoring
- Throughput metrics
- Resource utilization

## Optimization Checklist

### Frontend
- [ ] Implement lazy loading
- [ ] Optimize bundle size
- [ ] Use CDN for static assets
- [ ] Enable service worker caching
- [ ] Optimize images and fonts

### Backend
- [ ] Database query optimization
- [ ] Implement caching layers
- [ ] Use compression middleware
- [ ] Optimize API response sizes
- [ ] Monitor memory usage

### Infrastructure
- [ ] Use CDN for global distribution
- [ ] Implement load balancing
- [ ] Monitor server performance
- [ ] Set up auto-scaling
- [ ] Regular performance testing`,
  },
]

export default function GitHubDocsAgent() {
  const [selectedDoc, setSelectedDoc] = useState<DocType>(docTypes[0])
  const [githubUrl, setGithubUrl] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!githubUrl) return

    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-80 border-r bg-muted/30 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#001B74] rounded-lg flex items-center justify-center">
              <Github className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">GitHub Docs Agent</h1>
              <p className="text-sm text-muted-foreground">AI-powered documentation</p>
            </div>
          </div>

          {/* GitHub URL Input */}
          <div className="space-y-3">
            <Input
              placeholder="https://github.com/user/repo"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full"
            />
            <Button
              onClick={handleGenerate}
              disabled={!githubUrl || isGenerating}
              className="w-full bg-[#001B74] hover:bg-[#001B74]/90 text-white"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Docs
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Document Types */}
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Documentation Types</h3>
            {docTypes.map((docType) => (
              <button
                key={docType.id}
                onClick={() => setSelectedDoc(docType)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  selectedDoc.id === docType.id ? "bg-[#001B74] text-white" : "hover:bg-muted"
                }`}
              >
                <div className={`${selectedDoc.id === docType.id ? "text-white" : "text-muted-foreground"}`}>
                  {docType.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{docType.name}</div>
                  <div
                    className={`text-xs truncate ${
                      selectedDoc.id === docType.id ? "text-white/80" : "text-muted-foreground"
                    }`}
                  >
                    {docType.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>v1.0.0</span>
            <Badge variant="secondary" className="text-xs">
              Beta
            </Badge>
          </div>
        </div>
      </div>

      {/* Right Preview Area */}
      <div className="flex-1 flex flex-col">
        {/* Preview Header */}
        <div className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-muted-foreground">{selectedDoc.icon}</div>
            <div>
              <h2 className="font-semibold">{selectedDoc.name}</h2>
              <p className="text-sm text-muted-foreground">{selectedDoc.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto">
          <Card className="m-6 h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {selectedDoc.icon}
                {selectedDoc.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed">{selectedDoc.content}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
