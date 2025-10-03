/* React Flow Styles */
.reactflow-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.reactflow-container .react-flow {
  background: #f8fafc;
}

/* Custom node styles */
.react-flow__node {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 12px;
}

.react-flow__node.selected {
  box-shadow: 0 0 0 2px #f59e0b;
}

.react-flow__node.dragging {
  opacity: 0.8;
}

/* Custom edge styles */
.react-flow__edge {
  stroke: #64748b;
  stroke-width: 2;
}

.react-flow__edge.selected {
  stroke: #f59e0b;
  stroke-width: 3;
}

.react-flow__edge.animated {
  stroke-dasharray: 5;
  animation: dashdraw 0.5s linear infinite;
}

@keyframes dashdraw {
  to {
    stroke-dashoffset: -10;
  }
}

/* Handle styles */
.react-flow__handle {
  width: 8px;
  height: 8px;
  background: #555;
  border: 2px solid #fff;
  border-radius: 50%;
}

.react-flow__handle-top {
  top: -4px;
}

.react-flow__handle-bottom {
  bottom: -4px;
}

.react-flow__handle-left {
  left: -4px;
}

.react-flow__handle-right {
  right: -4px;
}

.react-flow__handle-connecting {
  background: #f59e0b;
}

.react-flow__handle-valid {
  background: #10b981;
}

/* Controls styles */
.react-flow__controls {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.react-flow__controls-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.react-flow__controls-button:hover {
  background: #f1f5f9;
}

.react-flow__controls-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Minimap styles */
.react-flow__minimap {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.react-flow__minimap-mask {
  fill: rgba(0, 0, 0, 0.1);
}

.react-flow__minimap-node {
  fill: #3b82f6;
  stroke: #1e40af;
  stroke-width: 1;
}

/* Background styles */
.react-flow__background {
  background: #f8fafc;
}

.react-flow__background-dots {
  fill: #cbd5e1;
}

.react-flow__background-lines {
  stroke: #e2e8f0;
  stroke-width: 1;
}

/* Selection styles */
.react-flow__selection {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid #3b82f6;
}

/* Connection line styles */
.react-flow__connection-line {
  stroke: #3b82f6;
  stroke-width: 2;
  stroke-dasharray: 5;
}

.react-flow__connection-path {
  stroke: #3b82f6;
  stroke-width: 2;
  fill: none;
}

/* Dark theme overrides */
.react-flow-container.dark .react-flow {
  background: #0f172a;
}

.react-flow-container.dark .react-flow__controls {
  background: #1e293b;
  border-color: #334155;
}

.react-flow-container.dark .react-flow__minimap {
  background: #0f172a;
  border-color: #334155;
}

.react-flow-container.dark .react-flow__background {
  background: #0f172a;
}

.react-flow-container.dark .react-flow__background-dots {
  fill: #475569;
}

.react-flow-container.dark .react-flow__background-lines {
  stroke: #334155;
}

/* Responsive styles */
@media (max-width: 768px) {
  .react-flow__controls {
    transform: scale(0.8);
  }
  
  .react-flow__minimap {
    transform: scale(0.8);
  }
}

/* Custom scrollbar for the flow */
.react-flow__viewport {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

.react-flow__viewport::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.react-flow__viewport::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.react-flow__viewport::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.react-flow__viewport::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
