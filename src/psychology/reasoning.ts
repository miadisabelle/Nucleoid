/**
 * Psychological Reasoning Engine
 * 
 * Integrates the Bonfire Blueprint with Nucleoid's knowledge graph
 * and declarative runtime for neuro-symbolic psychological reasoning
 */

import nucleoid from '../nucleoid';
import { 
  Verdict, 
  Belief, 
  Behavior, 
  PsychologicalProfile, 
  BonfireAnalysis,
  PsychologicalConcept 
} from './types';
import { BonfireBlueprint } from './blueprint';

export class PsychologicalReasoningEngine {
  private blueprint: BonfireBlueprint;
  private knowledgeGraph: Map<string, PsychologicalConcept[]>;

  constructor() {
    this.blueprint = new BonfireBlueprint();
    this.knowledgeGraph = new Map();
    this.initializeKnowledgeBase();
  }

  /**
   * Initialize the psychological knowledge base in Nucleoid's declarative runtime
   */
  private initializeKnowledgeBase(): void {
    // Register psychological classes with Nucleoid
    nucleoid.register(() => {
      'use declarative';
      
      class PsychologicalVerdict {
        id: string;
        content: string;
        type: string;
        strength: number;
        unconscious: boolean;
        
        constructor(content: string, type: string) {
          this.id = `verdict-${Date.now()}`;
          this.content = content;
          this.type = type;
          this.strength = 0.8;
          this.unconscious = true;
        }
      }

      class PsychologicalBelief {
        id: string;
        content: string;
        verdict?: string;
        type: string;
        frequency: number;
        
        constructor(content: string, type: string) {
          this.id = `belief-${Date.now()}`;
          this.content = content;
          this.type = type;
          this.frequency = 1;
        }
      }

      class CompensatoryBehavior {
        id: string;
        description: string;
        type: string;
        verdict?: string;
        effectiveness: number;
        cost: number;
        
        constructor(description: string, verdict?: string) {
          this.id = `behavior-${Date.now()}`;
          this.description = description;
          this.type = 'compensatory';
          this.verdict = verdict;
          this.effectiveness = 0.3; // Usually low long-term effectiveness
          this.cost = 0.7; // Usually high psychological cost
        }
      }

      // Declarative rules for psychological reasoning
      
      // Rule: All compensatory behaviors serve an underlying verdict
      $CompensatoryBehavior.verdict = function() {
        return this.verdict || 'unknown-verdict';
      };

      // Rule: Verdicts generate multiple symptomatic beliefs
      $PsychologicalVerdict.generatesSymptons = true;

      // Rule: Failed therapeutic models target symptoms, not verdicts
      $TherapeuticIntervention.targetsRoot = function() {
        return this.target === 'verdict';
      };

      return { PsychologicalVerdict, PsychologicalBelief, CompensatoryBehavior };
    });
  }

  /**
   * Add a psychological concept to the knowledge graph
   */
  addToKnowledgeGraph(concept: PsychologicalConcept): void {
    const type = this.getConceptType(concept);
    
    if (!this.knowledgeGraph.has(type)) {
      this.knowledgeGraph.set(type, []);
    }
    
    this.knowledgeGraph.get(type)?.push(concept);
    
    // Also add to Nucleoid's runtime for declarative reasoning
    this.addToNucleoidRuntime(concept);
  }

  /**
   * Add concept to Nucleoid's declarative runtime
   */
  private addToNucleoidRuntime(concept: PsychologicalConcept): void {
    try {
      if (this.isVerdict(concept)) {
        nucleoid.run(`
          'use imperative';
          var verdict_${concept.id} = new PsychologicalVerdict('${concept.content}', '${concept.type}');
        `);
      } else if (this.isBelief(concept)) {
        nucleoid.run(`
          'use imperative';
          var belief_${concept.id} = new PsychologicalBelief('${concept.content}', '${concept.type}');
        `);
      } else if (this.isBehavior(concept)) {
        nucleoid.run(`
          'use imperative';
          var behavior_${concept.id} = new CompensatoryBehavior('${concept.description}', '${concept.verdict}');
        `);
      }
    } catch (error) {
      console.warn('Failed to add concept to Nucleoid runtime:', error);
    }
  }

  /**
   * Query the knowledge graph using declarative logic
   */
  query(queryType: 'verdicts' | 'beliefs' | 'behaviors' | 'connections', params?: any): any[] {
    switch (queryType) {
      case 'verdicts':
        return this.queryVerdicts(params);
      
      case 'beliefs':
        return this.queryBeliefs(params);
      
      case 'behaviors':
        return this.queryBehaviors(params);
      
      case 'connections':
        return this.queryConnections(params);
      
      default:
        return [];
    }
  }

  /**
   * Query verdicts from the knowledge graph
   */
  private queryVerdicts(params?: { type?: string; unconscious?: boolean }): Verdict[] {
    const verdicts = this.knowledgeGraph.get('verdict') as Verdict[] || [];
    
    if (!params) return verdicts;
    
    return verdicts.filter(verdict => {
      if (params.type && verdict.type !== params.type) return false;
      if (params.unconscious !== undefined && verdict.unconscious !== params.unconscious) return false;
      return true;
    });
  }

  /**
   * Query beliefs and their connections to verdicts
   */
  private queryBeliefs(params?: { verdictId?: string; type?: string }): Belief[] {
    const beliefs = this.knowledgeGraph.get('belief') as Belief[] || [];
    
    if (!params) return beliefs;
    
    return beliefs.filter(belief => {
      if (params.verdictId && belief.verdict !== params.verdictId) return false;
      if (params.type && belief.type !== params.type) return false;
      return true;
    });
  }

  /**
   * Query behaviors that serve verdicts
   */
  private queryBehaviors(params?: { verdictId?: string; type?: string }): Behavior[] {
    const behaviors = this.knowledgeGraph.get('behavior') as Behavior[] || [];
    
    if (!params) return behaviors;
    
    return behaviors.filter(behavior => {
      if (params.verdictId && behavior.verdict !== params.verdictId) return false;
      if (params.type && behavior.type !== params.type) return false;
      return true;
    });
  }

  /**
   * Query connections between psychological concepts
   */
  private queryConnections(params?: { verdictId?: string }): any[] {
    const connections = [];
    
    if (params?.verdictId) {
      const beliefs = this.queryBeliefs({ verdictId: params.verdictId });
      const behaviors = this.queryBehaviors({ verdictId: params.verdictId });
      
      connections.push({
        verdictId: params.verdictId,
        connectedBeliefs: beliefs,
        connectedBehaviors: behaviors,
        strength: this.calculateConnectionStrength(beliefs, behaviors)
      });
    }
    
    return connections;
  }

  /**
   * Calculate the strength of connections between a verdict and its symptoms
   */
  private calculateConnectionStrength(beliefs: Belief[], behaviors: Behavior[]): number {
    const totalSymptoms = beliefs.length + behaviors.length;
    const averageFrequency = beliefs.reduce((sum, belief) => sum + belief.frequency, 0) / (beliefs.length || 1);
    
    // Higher symptom count and frequency = stronger connection
    return Math.min(1, (totalSymptoms * averageFrequency) / 10);
  }

  /**
   * Analyze a psychological profile using the knowledge graph
   */
  analyzeProfile(profile: PsychologicalProfile): BonfireAnalysis {
    // Add profile data to knowledge graph
    profile.verdicts.forEach(v => this.addToKnowledgeGraph(v));
    profile.beliefs.forEach(b => this.addToKnowledgeGraph(b));
    profile.behaviors.forEach(b => this.addToKnowledgeGraph(b));

    // Use the Bonfire Blueprint for analysis
    return this.blueprint.analyzePsychologicalProfile(profile);
  }

  /**
   * Reason about therapeutic effectiveness using declarative logic
   */
  reasonAboutTherapeuticEffectiveness(interventionType: 'failed-model' | 'exposure-method'): any {
    try {
      // Use Nucleoid's declarative reasoning
      const result = nucleoid.run(`
        'use declarative';
        
        // Declarative rule: Failed models target symptoms, not root causes
        var failedModelEffectiveness = function(intervention) {
          return intervention.target === 'belief' || intervention.target === 'behavior' ? 0.3 : 0.8;
        };
        
        // Declarative rule: Exposure methods target verdicts directly
        var exposureMethodEffectiveness = function(intervention) {
          return intervention.target === 'verdict' ? 0.8 : 0.3;
        };
        
        // Return effectiveness based on intervention type
        '${interventionType}' === 'failed-model' ? 0.3 : 0.8;
      `);

      return result;
    } catch (error) {
      console.warn('Failed to reason about therapeutic effectiveness:', error);
      return interventionType === 'failed-model' ? 0.3 : 0.8;
    }
  }

  /**
   * Use declarative reasoning to expose verdicts from symptoms
   */
  exposeVerdictFromSymptoms(symptoms: (Belief | Behavior)[]): Verdict | null {
    // Use the blueprint's verdict exposure logic
    const belief = symptoms.find(s => this.isBelief(s)) as Belief;
    if (belief) {
      return this.blueprint.exposeVerdict(belief);
    }
    
    return null;
  }

  // Type guards and utility methods
  private getConceptType(concept: PsychologicalConcept): string {
    if (this.isVerdict(concept)) return 'verdict';
    if (this.isBelief(concept)) return 'belief';
    if (this.isBehavior(concept)) return 'behavior';
    return 'therapeutic-model';
  }

  private isVerdict(concept: any): concept is Verdict {
    return concept && typeof concept.content === 'string' && 
           typeof concept.strength === 'number' && 
           typeof concept.unconscious === 'boolean';
  }

  private isBelief(concept: any): concept is Belief {
    return concept && typeof concept.content === 'string' && 
           typeof concept.frequency === 'number';
  }

  private isBehavior(concept: any): concept is Behavior {
    return concept && typeof concept.description === 'string' && 
           typeof concept.effectiveness === 'number';
  }
}

// Export singleton instance for use throughout the application
export const psychologicalReasoning = new PsychologicalReasoningEngine();