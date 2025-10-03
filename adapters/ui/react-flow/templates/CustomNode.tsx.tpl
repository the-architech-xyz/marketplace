import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { FlowNode } from '@/types/reactflow';

interface CustomNodeData {
  label: string;
  type: 'input' | 'output' | 'default';
  color?: string;
  icon?: string;
  description?: string;
}

export const CustomNode = memo(({ data, selected }: NodeProps<CustomNodeData>) => {
  const { label, type, color = '#2563eb', icon, description } = data;

  const getNodeStyle = () => {
    const baseStyle = {
      background: color,
      color: 'white',
      border: selected ? '2px solid #f59e0b' : '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '12px 16px',
      minWidth: '120px',
      boxShadow: selected ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    switch (type) {
      case 'input':
        return { ...baseStyle, background: '#10b981' };
      case 'output':
        return { ...baseStyle, background: '#ef4444' };
      default:
        return baseStyle;
    }
  };

  return (
    <div style={getNodeStyle()}>
      {/* Input handles */}
      {type !== 'input' && (
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: '#555' }}
        />
      )}
      
      {/* Node content */}
      <div className="flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        <div>
          <div className="font-semibold text-sm">{label}</div>
          {description && (
            <div className="text-xs opacity-80 mt-1">{description}</div>
          )}
        </div>
      </div>

      {/* Output handles */}
      {type !== 'output' && (
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: '#555' }}
        />
      )}
    </div>
  );
});

CustomNode.displayName = 'CustomNode';
