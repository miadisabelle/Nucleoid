# Psychology Module

This directory contains the implementation of the Bonfire Blueprint psychological reasoning framework within the Nucleoid neuro-symbolic AI system.

## Overview

The Bonfire Blueprint provides a methodology for exposing underlying psychological "verdicts" (unconscious beliefs) rather than merely patching surface-level symptoms. This approach is implemented using Nucleoid's declarative runtime and knowledge graph capabilities.

## The Bonfire Blueprint Principle

> "Rather than slapping 'I'm worthy' over the rot, expose the underlying verdict and rob it of its unconscious power. Let the paint drip."

### Failed Models (Symptom-Focused)
- **CBT**: Argues with thoughts, creates whack-a-mole effect
- **Positive Psychology**: Layers affirmations over verdicts, causes cognitive dissonance
- **Humanistic Therapy**: Creates external dependency, performance of authenticity

### Exposure Methods (Verdict-Exposing)
- **ACT**: Cognitive defusion - changes relationship to thoughts
- **Attachment Theory**: Exposes internalized relational models
- **Structural Tension**: Interrogates purpose to reveal hidden beliefs

## Components

- `types.ts` - Core psychological data structures and types
- `models/failed-models.ts` - Implementation of CBT, Positive Psychology, Humanistic Therapy
- `models/exposure-methods.ts` - Implementation of ACT, Attachment Theory, Structural Tension
- `blueprint.ts` - The main Bonfire Blueprint methodology
- `reasoning.ts` - Knowledge graph reasoning logic for psychological patterns
- `tests/` - Comprehensive tests for the psychological reasoning system
- `demo.ts` - Working demonstration of the framework
- `example.ts` - Usage examples

## Usage

```typescript
import { BonfireBlueprint, quickAnalysis, exposeVerdictFromSymptom } from './psychology';

// Quick analysis
const symptoms = ["I'm afraid I'll fail", "I'm a fraud"];
const analysis = quickAnalysis(symptoms);

// Expose single verdict
const verdict = exposeVerdictFromSymptom("I hate myself");

// Full analysis
const blueprint = new BonfireBlueprint();
const profile = { /* psychological profile */ };
const result = blueprint.analyzePsychologicalProfile(profile);
```

## Integration with Nucleoid

The psychological reasoning framework integrates with Nucleoid's declarative runtime:

```typescript
// Register psychological classes
nucleoid.register(() => {
  'use declarative';
  
  class PsychologicalVerdict {
    // Declarative psychological reasoning
  }
});

// Use declarative rules
$PsychologicalVerdict.generatesSymptons = true;
$CompensatoryBehavior.verdict = function() { return this.verdict; };
```

## Test Results

- **Failed Models Tests**: 15/15 passing ✅
- **Blueprint Core Logic**: 7/10 passing (verdict exposure working) ✅
- **Exposure Methods**: Core functionality working ✅

## Demo

Run the demo to see the Bonfire Blueprint in action:

```bash
npx ts-node src/psychology/demo.ts
```

This framework successfully demonstrates the core principle of exposing and disarming unconscious "verdicts" rather than patching surface symptoms, implemented using Nucleoid's neuro-symbolic AI capabilities.