export interface Source {
  id: number;
  name: string;
  type: 'YouTube' | 'RSS' | 'Twitter' | 'Blog';
  url: string;
  status: 'active' | 'paused' | 'error';
  lastCrawled: string | null;
  icon: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  totalViews: number;
  engagement: number;
  lastUpdated: string;
  thumbnail: string;
  category?: string;
}

export interface TopicAnalytic {
  id: number;
  title: string;
  status: 'accepted' | 'rejected' | 'pending';
  views: number;
  engagement: number;
  uplift: string;
  suggestedDate: string;
  publishedDate: string | null;
}

export interface TrendingTopic {
  topic: string;
  score: number;
  change: string;
  category: string;
}

export interface EfficiencyMetric {
  contentCreationTime: {
    average: string;
    improvement: string;
  };
  researchEfficiency: {
    topicsPerHour: number;
    accuracy: string;
  };
}

export interface UsageStats {
  topicsAccepted: {
    value: number;
    change: string;
  };
  avgViewsUplift: {
    value: string;
    change: string;
  };
  researchTimeSaved: {
    value: string;
    change: string;
  };
  totalViews: {
    value: string;
    change: string;
  };
}

export interface DeliveryChannel {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  subscribers?: number;
  followers?: number;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  plan: string;
  joinedAt: string;
  preferences: {
    notifications: boolean;
    autoPublish: boolean;
  };
}

export interface CreateSourceData {
  url: string;
  type: 'YouTube' | 'RSS' | 'Twitter' | 'Blog';
  name?: string;
}

export interface CreateProjectData {
  title: string;
  description?: string;
  category?: string;
}

export interface UpdateProjectData {
  title?: string;
  description?: string;
  status?: 'active' | 'draft' | 'archived';
}

export interface PublishContentData {
  projectId: number;
  channels: string[];
  scheduleDate?: string;
}

export interface PublishResponse {
  id: number;
  projectId: number;
  channels: string[];
  status: 'scheduled' | 'published' | 'failed';
  scheduleDate?: string;
  createdAt: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
  };
}

class APIClient {
  private baseURL: string;

  constructor(baseURL: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001') {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body !== 'string') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.error.message);
      }

      // Handle 204 No Content responses
      if (response.status === 204) {
        return null as T;
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Health Check
  async healthCheck(): Promise<{ status: string; timestamp: string; uptime: number }> {
    return this.request('/health');
  }

  // Sources Management
  async getSources(): Promise<Source[]> {
    const data = await this.request<{ sources: Source[] }>('/v1/sources');
    return data.sources;
  }

  async createSource(sourceData: CreateSourceData): Promise<Source> {
    return this.request('/v1/sources', {
      method: 'POST',
      body: sourceData,
    });
  }

  async updateSourceStatus(id: number, status: Source['status']): Promise<Source> {
    return this.request(`/v1/sources/${id}/status`, {
      method: 'PUT',
      body: { status },
    });
  }

  async deleteSource(id: number): Promise<void> {
    return this.request(`/v1/sources/${id}`, {
      method: 'DELETE',
    });
  }

  // Projects Management
  async getProjects(): Promise<Project[]> {
    const data = await this.request<{ projects: Project[] }>('/v1/projects');
    return data.projects;
  }

  async createProject(projectData: CreateProjectData): Promise<Project> {
    return this.request('/v1/projects', {
      method: 'POST',
      body: projectData,
    });
  }

  async updateProject(id: number, updates: UpdateProjectData): Promise<Project> {
    return this.request(`/v1/projects/${id}`, {
      method: 'PUT',
      body: updates,
    });
  }

  async deleteProject(id: number): Promise<void> {
    return this.request(`/v1/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Analytics
  async getTopicAnalytics(filters: { status?: string; timeRange?: string } = {}): Promise<{ topics: TopicAnalytic[] }> {
    const params = new URLSearchParams(filters as Record<string, string>);
    return this.request(`/v1/analytics/topics?${params}`);
  }

  async getTrends(): Promise<{ trending: TrendingTopic[] }> {
    return this.request('/v1/analytics/trends');
  }

  async getEfficiencyMetrics(): Promise<EfficiencyMetric> {
    return this.request('/v1/analytics/efficiency');
  }

  // Statistics
  async getUsageStats(): Promise<UsageStats> {
    return this.request('/v1/stats/usage');
  }

  // Delivery
  async getDeliveryChannels(): Promise<{ channels: DeliveryChannel[] }> {
    return this.request('/v1/delivery/channels');
  }

  async publishContent(publishData: PublishContentData): Promise<PublishResponse> {
    return this.request('/v1/delivery/publish', {
      method: 'POST',
      body: publishData,
    });
  }

  // User Management
  async getUserProfile(): Promise<UserProfile> {
    return this.request('/v1/user/profile');
  }

  async updateUserProfile(updates: Partial<Omit<UserProfile, 'id' | 'joinedAt'>>): Promise<UserProfile> {
    return this.request('/v1/user/profile', {
      method: 'PUT',
      body: updates,
    });
  }
}

// Create and export a default instance
const api = new APIClient();
export default api;