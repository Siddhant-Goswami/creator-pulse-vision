# Content Management Dashboard API Specification

## Overview
This API specification defines the endpoints required to support a content management dashboard with source management, analytics, and project tracking capabilities.

## Base URL
```
https://api.yourapp.com/v1
```

## Authentication
All API endpoints require authentication via Bearer token:
```
Authorization: Bearer <your_access_token>
```

## Endpoints

### 1. Sources Management

#### GET /sources
Retrieve all connected sources (YouTube channels, RSS feeds, etc.)

**Response:**
```json
{
  "sources": [
    {
      "id": 1,
      "name": "Tech Channel",
      "type": "YouTube",
      "url": "https://youtube.com/@techchannel",
      "status": "active",
      "lastCrawled": "2024-01-15T10:30:00Z",
      "icon": "youtube"
    }
  ]
}
```

#### POST /sources
Add a new source

**Request:**
```json
{
  "url": "https://youtube.com/@newchannel",
  "type": "YouTube"
}
```

**Response:**
```json
{
  "id": 5,
  "name": "New Channel",
  "type": "YouTube",
  "url": "https://youtube.com/@newchannel",
  "status": "active",
  "lastCrawled": null,
  "icon": "youtube"
}
```

#### PUT /sources/{id}/status
Toggle source active/inactive status

**Request:**
```json
{
  "status": "paused"
}
```

#### DELETE /sources/{id}
Remove a source

### 2. Usage Statistics

#### GET /stats/usage
Retrieve usage statistics for the dashboard

**Response:**
```json
{
  "topicsAccepted": {
    "value": 18,
    "change": "+2 from last month"
  },
  "avgViewsUplift": {
    "value": "+28%",
    "change": "vs your baseline"
  },
  "researchTimeSaved": {
    "value": "4.2h",
    "change": "per accepted topic"
  },
  "totalViews": {
    "value": "1.2M",
    "change": "from suggested topics"
  }
}
```

### 3. Projects Management

#### GET /projects
Retrieve all projects

**Response:**
```json
{
  "projects": [
    {
      "id": 1,
      "title": "Tech Review Series",
      "description": "Weekly technology product reviews",
      "status": "active",
      "totalViews": 125000,
      "engagement": 8.5,
      "lastUpdated": "2024-01-15T14:30:00Z",
      "thumbnail": "/api/projects/1/thumbnail"
    }
  ]
}
```

#### POST /projects
Create a new project

**Request:**
```json
{
  "title": "New Series",
  "description": "Description of the new series",
  "category": "Tech"
}
```

#### PUT /projects/{id}
Update project details

#### DELETE /projects/{id}
Delete a project

### 4. Analytics

#### GET /analytics/topics
Retrieve topic performance analytics

**Query Parameters:**
- `timeRange`: "7d", "30d", "90d", "1y"
- `status`: "accepted", "rejected", "pending"

**Response:**
```json
{
  "topics": [
    {
      "id": 1,
      "title": "AI-Powered Code Reviews",
      "status": "accepted",
      "views": 45200,
      "engagement": 8.7,
      "uplift": "+32%",
      "suggestedDate": "2024-01-10T00:00:00Z",
      "publishedDate": "2024-01-12T00:00:00Z"
    }
  ],
  "summary": {
    "totalTopics": 156,
    "acceptedTopics": 18,
    "avgUplift": 28,
    "totalViews": 1200000
  }
}
```

#### GET /analytics/trends
Retrieve trend analysis data

**Response:**
```json
{
  "trends": [
    {
      "keyword": "AI",
      "growth": "+45%",
      "volume": 25000,
      "category": "Technology"
    }
  ],
  "timeRange": "30d"
}
```

#### GET /analytics/efficiency
Retrieve efficiency metrics

**Response:**
```json
{
  "metrics": {
    "avgResearchTime": {
      "current": "4.2h",
      "previous": "8.5h",
      "improvement": "50.6%"
    },
    "publishingFrequency": {
      "current": "3x/week",
      "previous": "2x/week",
      "improvement": "+50%"
    },
    "topicAcceptanceRate": {
      "current": "72%",
      "previous": "45%",
      "improvement": "+27%"
    }
  }
}
```

### 5. User Management

#### GET /user/profile
Get user profile information

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": "/api/user/avatar",
  "subscription": "pro",
  "joinedAt": "2023-06-15T00:00:00Z"
}
```

#### PUT /user/profile
Update user profile

### 6. Delivery Management

#### GET /delivery/channels
Get delivery channels configuration

**Response:**
```json
{
  "channels": [
    {
      "id": 1,
      "name": "YouTube",
      "type": "video",
      "status": "connected",
      "lastSync": "2024-01-15T12:00:00Z"
    },
    {
      "id": 2,
      "name": "Blog",
      "type": "article",
      "status": "connected",
      "lastSync": "2024-01-15T11:30:00Z"
    }
  ]
}
```

#### POST /delivery/publish
Publish content to delivery channels

**Request:**
```json
{
  "projectId": 1,
  "channels": ["youtube", "blog"],
  "scheduleDate": "2024-01-20T15:00:00Z"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request parameters are invalid",
    "details": {
      "field": "url",
      "reason": "Invalid URL format"
    }
  }
}
```

### 401 Unauthorized
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

### 403 Forbidden
```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}
```

### 404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An internal server error occurred"
  }
}
```

## Rate Limiting
- 1000 requests per hour per user
- Rate limit headers included in responses:
  - `X-RateLimit-Limit`: Request limit per hour
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: UTC timestamp when limit resets

## Webhooks

### Source Update Webhook
Triggered when a source is crawled or updated

**Payload:**
```json
{
  "event": "source.updated",
  "data": {
    "sourceId": 1,
    "status": "completed",
    "newContentCount": 5,
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### Topic Suggestion Webhook
Triggered when new topics are suggested

**Payload:**
```json
{
  "event": "topic.suggested",
  "data": {
    "topicId": 123,
    "title": "New AI Development Tools",
    "confidence": 0.85,
    "suggestedAt": "2024-01-15T10:30:00Z"
  }
}
```

## Data Models

### Source
```json
{
  "id": "integer",
  "name": "string",
  "type": "string (YouTube|RSS|Twitter|Blog)",
  "url": "string (url)",
  "status": "string (active|paused|error)",
  "lastCrawled": "string (ISO 8601)",
  "icon": "string",
  "createdAt": "string (ISO 8601)",
  "updatedAt": "string (ISO 8601)"
}
```

### Project
```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "status": "string (active|draft|archived)",
  "totalViews": "integer",
  "engagement": "number",
  "category": "string",
  "thumbnail": "string (url)",
  "createdAt": "string (ISO 8601)",
  "updatedAt": "string (ISO 8601)"
}
```

### Topic
```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "status": "string (pending|accepted|rejected)",
  "views": "integer",
  "engagement": "number",
  "uplift": "string",
  "confidence": "number (0-1)",
  "sourceId": "integer",
  "suggestedDate": "string (ISO 8601)",
  "publishedDate": "string (ISO 8601)"
}
```