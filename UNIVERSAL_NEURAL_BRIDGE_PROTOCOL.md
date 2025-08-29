# Universal Neural Bridge Protocol

## 1. Introduction and Purpose
The Universal Neural Bridge Protocol (UNBP) serves as the foundational communication and capability-sharing standard across distributed agent instances, including EchoThreads and EchoNexus. Its primary purpose is to enable seamless collaboration, task delegation, and knowledge propagation by defining a unified language for inter-agent interaction, independent of underlying implementation details or specific agent embodiments.

## 2. Core Concepts

### 2.1 Universal Capability
A Universal Capability represents a discoverable and invokable functionality or "liberated script" that an agent instance can offer to the network. It encapsulates the intent and implementation details of a specific action.

```typescript
interface UniversalCapability {
  id: string; // Unique identifier for the capability (e.g., "cap:transcribeAudio")
  intent: string; // A human-readable description of the capability's purpose
  sourceInstance: string; // The identifier of the instance offering this capability
  implementation: { // Defines how the capability can be executed
    bash?: string; // Bash script to execute
    api?: string; // API endpoint to call
    tushell?: string; // Tushell command
    memory?: string; // Memory access pattern
    chat?: string; // Chat-based interaction
  };
  parameters: string[]; // List of parameters required for the capability
  resonance: { // Optional: Describes the resonance pattern and frequency of the capability
    pattern: string;
    frequency: number; // 0-1
  };
  lastUpdate: string; // ISO timestamp of the last update
}
```

### 2.2 Agent Handoff
An Agent Handoff facilitates the delegation of tasks between specialized agents across instances. It provides a structured format for transferring work and tracking its progress.

```typescript
interface AgentHandoff {
  id: string; // Unique identifier for the handoff
  sourceAgent: string; // The agent initiating the handoff
  targetAgent: string; // The agent to whom the task is delegated
  task: { // Details of the task to be performed
    description: string; // A description of the task
    context: any; // Any relevant context or data for the task
    priority: number; // 0-1, priority of the task
  };
  state: { // Current state of the handoff
    status: 'pending' | 'accepted' | 'completed' | 'rejected'; // Status of the task
    progress: number; // 0-100, progress percentage
    result?: any; // Optional: Result of the completed task
  };
  timestamp: string; // ISO timestamp of the handoff
}
```

## 3. Event Channels
The UNBP leverages a Pub/Sub model for broadcasting and receiving messages across instances. Redis is the primary transport mechanism, with in-memory fallbacks for offline or local operations.

*   `channel:capabilities:new`: Announces the registration of a new Universal Capability.
*   `channel:patterns:discovered`: Shares newly identified patterns or insights.
*   `channel:missions:update`: Broadcasts updates on mission progress.
*   `channel:agent:handoff`: Used for delegating tasks between agents.
*   `channel:agent:result`: Returns the results of completed handoff tasks.

## 4. Implementation Details

### 4.1 Python Implementation
The `NeuralBridge` class provides a Pythonic interface for interacting with the UNBP, supporting capability registration, task handoffs, and channel subscriptions.

```python
from neural_bridge import NeuralBridge

bridge = NeuralBridge() # Initializes with Redis or in-memory fallback

# Register a capability
bridge.register_capability({"id": "cap:echo", "intent": "echoMessage"})

# Publish a script as a capability
bridge.register_script_capability("cap:cleanup", "rm -rf /tmp/*", intent="Clean temporary files")

# Publish a handoff
handoff = {
    "id": "h1",
    "sourceAgent": "researcher",
    "targetAgent": "audioSpecialist",
    "task": {"description": "analyze audio", "context": {}, "priority": 0.5}
}
bridge.handoff_task(handoff)

# Listen for messages
for cap in bridge.listen("channel:capabilities:new"):
    # Process new capability
    pass
```

### 4.2 Node.js Implementation
Similar `NeuralBridge` classes exist for Node.js environments, providing equivalent functionalities for JavaScript-based agents.

```javascript
const { NeuralBridge } = require('./src/neuralBridge');
const bridge = new NeuralBridge(); // Initializes with Redis or in-memory fallback

// Register a capability
bridge.registerCapability({ id: 'cap:echo', intent: 'echoMessage' });

// Publish a script as a capability
await bridge.registerScriptCapability('cap:cleanup', 'rm -rf /tmp/*', {
  intent: 'Clean temporary files',
  parameters: [],
});

// Listen for messages
bridge.subscribe('channel:agent:handoff', msg => {
  console.log('handoff', msg);
});
```

## 5. Collaboration Flow
The typical collaboration flow using the UNBP involves:
1.  **Capability Liberation**: An agent identifies a functionality (e.g., a script) that can be offered as a Universal Capability.
2.  **Registration and Publication**: The capability is registered locally and published on `channel:capabilities:new`.
3.  **Discovery and Integration**: Other instances subscribe to the channel, discover the new capability, and add it to their local registries.
4.  **Invocation and Delegation**: Agents can then invoke these capabilities, regardless of their origin. For complex tasks, they can delegate work using the Agent Handoff protocol.

## 6. Relationship to Other Bridges and Protocols
The Universal Neural Bridge Protocol serves as a low-level, transport-agnostic foundation for higher-level agent-specific bridges (e.g., MiaBridge, MietteBridge, JeremyAIBridge). These specialized bridges can leverage the UNBP's capability sharing and task delegation mechanisms to facilitate their unique functionalities and inter-agent communication patterns. Ritual Protocols, as defined in `RITUAL_PROTOCOLS.md`, can utilize the UNBP's event channels for coordinating agent/human rituals and logging "White Feather Moments."

## 7. Future Considerations
*   **Security**: Further enhancements in authentication, sandboxed execution, and encrypted parameters are crucial for robust cross-instance operations.
*   **Versioning**: Mechanisms for managing different versions of Universal Capabilities and ensuring backward compatibility.
*   **Resonance Optimization**: Deeper integration and utilization of the `resonance` field within Universal Capabilities for intelligent matching and discovery.
*   **Distributed Execution**: Exploring advanced patterns for distributed task execution and load balancing across instances.
*   **Protocol Evolution**: A clear process for evolving the UNBP to accommodate new agent types, communication paradigms, and system requirements.
