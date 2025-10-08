// Projects Page Component

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Copy,
  ExternalLink,
  Calendar,
  Users,
  Activity,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'maintenance' | 'archived';
  health: 'healthy' | 'warning' | 'critical';
  uptime: number;
  responseTime: number;
  errorRate: number;
  lastDeployment: Date;
  team: Array<{
    id: string;
    name: string;
    role: string;
    avatar?: string;
  }>;
  metrics: {
    requests: number;
    errors: number;
    latency: number;
    throughput: number;
  };
  alerts: number;
  tags: string[];
}

interface ProjectsPageProps {
  projects: Project[];
  onCreateProject: (project: Omit<Project, 'id'>) => void;
  onUpdateProject: (id: string, updates: Partial<Project>) => void;
  onDeleteProject: (id: string) => void;
  onDuplicateProject: (id: string) => void;
  onOpenProject: (id: string) => void;
  isLoading?: boolean;
  className?: string;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  onCreateProject,
  onUpdateProject,
  onDeleteProject,
  onDuplicateProject,
  onOpenProject,
  isLoading = false,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterHealth, setFilterHealth] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'lastDeployment' | 'uptime' | 'responseTime'>('lastDeployment');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
      const matchesHealth = filterHealth === 'all' || project.health === filterHealth;
      return matchesSearch && matchesStatus && matchesHealth;
    })
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthColor = (health: string): string => {
    switch (health) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatUptime = (uptime: number): string => {
    return `${uptime.toFixed(2)}%`;
  };

  const formatResponseTime = (time: number): string => {
    return `${time}ms`;
  };

  const formatErrorRate = (rate: number): string => {
    return `${rate.toFixed(2)}%`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-gray-600">
            Monitor and manage your application projects
          </p>
        </div>
        <Button onClick={() => onCreateProject({
          name: 'New Project',
          description: '',
          status: 'active',
          health: 'healthy',
          uptime: 99.9,
          responseTime: 100,
          errorRate: 0.1,
          lastDeployment: new Date(),
          team: [],
          metrics: {
            requests: 0,
            errors: 0,
            latency: 0,
            throughput: 0,
          },
          alerts: 0,
          tags: [],
        })}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="maintenance">Maintenance</option>
          <option value="archived">Archived</option>
        </select>

        <select
          value={filterHealth}
          onChange={(e) => setFilterHealth(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Health</option>
          <option value="healthy">Healthy</option>
          <option value="warning">Warning</option>
          <option value="critical">Critical</option>
        </select>

        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split('-');
            setSortBy(field as any);
            setSortOrder(order as any);
          }}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="lastDeployment-desc">Last Deployment</option>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="uptime-desc">Uptime</option>
          <option value="responseTime-asc">Response Time</option>
        </select>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || filterStatus !== 'all' || filterHealth !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first project'
              }
            </p>
            <Button onClick={() => onCreateProject({
              name: 'New Project',
              description: '',
              status: 'active',
              health: 'healthy',
              uptime: 99.9,
              responseTime: 100,
              errorRate: 0.1,
              lastDeployment: new Date(),
              team: [],
              metrics: {
                requests: 0,
                errors: 0,
                latency: 0,
                throughput: 0,
              },
              alerts: 0,
              tags: [],
            })}>
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg ${getHealthColor(project.health)}`}>
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Badge className={getHealthColor(project.health)}>
                          {project.health}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onOpenProject(project.id)}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdateProject(project.id, {})}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDuplicateProject(project.id)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDeleteProject(project.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="line-clamp-2">
                  {project.description || 'No description provided'}
                </CardDescription>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Uptime</p>
                    <p className="font-medium">{formatUptime(project.uptime)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Response Time</p>
                    <p className="font-medium">{formatResponseTime(project.responseTime)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Error Rate</p>
                    <p className="font-medium">{formatErrorRate(project.errorRate)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Alerts</p>
                    <p className="font-medium">{project.alerts}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Requests</p>
                    <p className="font-medium">{project.metrics.requests.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Errors</p>
                    <p className="font-medium">{project.metrics.errors.toLocaleString()}</p>
                  </div>
                </div>
                
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Calendar className="w-3 h-3" />
                    <span>Deployed {formatDate(project.lastDeployment)}</span>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => onOpenProject(project.id)}
                  >
                    Monitor
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};