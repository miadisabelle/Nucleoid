/**
 * The Bonfire Blueprint: Exposing the Verdict
 * 
 * Main methodology for exposing and disarming unconscious verdicts
 * rather than patching symptoms. This is the core implementation of
 * the psychological framework described in the issue.
 */

import { 
  Verdict, 
  Belief, 
  Behavior, 
  PsychologicalProfile, 
  BonfireAnalysis,
  TherapeuticIntervention 
} from './types';

import { 
  CognitiveBehavioralTherapy, 
  PositivePsychology, 
  HumanisticTherapy 
} from './models/failed-models';

import { 
  AcceptanceCommitmentTherapy, 
  AttachmentTheory, 
  StructuralTensionApproach 
} from './models/exposure-methods';

export class BonfireBlueprint {
  private failedModels = {
    cbt: new CognitiveBehavioralTherapy(),
    positivePsychology: new PositivePsychology(),
    humanisticTherapy: new HumanisticTherapy()
  };

  private exposureMethods = {
    act: new AcceptanceCommitmentTherapy(),
    attachmentTheory: new AttachmentTheory(),
    structuralTension: new StructuralTensionApproach()
  };

  /**
   * Core principle: Stop arguing with self-talk, listen to it as symptom
   * Use downward arrow technique to expose underlying verdict
   */
  exposeVerdict(belief: Belief): Verdict | null {
    const steps = this.downwardArrowTechnique(belief.content);
    
    // Simulate the process of drilling down to core verdict
    const coreContent = this.extractCoreVerdict(steps);
    
    if (coreContent) {
      return {
        id: `verdict-${Date.now()}`,
        content: coreContent,
        type: this.categorizeVerdict(coreContent),
        strength: 0.8, // Newly exposed verdicts often have high strength
        unconscious: false, // Now conscious after exposure
        createdAt: new Date()
      };
    }

    return null;
  }

  /**
   * The downward arrow technique implementation
   * Keeps asking "what would that mean?" until reaching core verdict
   */
  private downwardArrowTechnique(initialThought: string): string[] {
    const steps = [initialThought];
    
    // Don't process positive/rational thoughts
    const lowerThought = initialThought.toLowerCase();
    if (lowerThought.includes('can learn') || 
        lowerThought.includes('capable') || 
        lowerThought.includes('worthy') ||
        lowerThought.includes('good enough') ||
        (!lowerThought.includes('fail') && !lowerThought.includes('bad') && 
         !lowerThought.includes('wrong') && !lowerThought.includes('reject') &&
         !lowerThought.includes('fraud') && !lowerThought.includes('mess') &&
         !lowerThought.includes('leave') && !lowerThought.includes('hate'))) {
      return steps; // Return just the initial thought for positive content
    }
    
    // Common patterns that lead to core verdicts
    const patterns = [
      { trigger: 'fail', next: 'It would mean I\'m incompetent' },
      { trigger: 'mess', next: 'It would mean I\'m incompetent' },
      { trigger: 'not good enough', next: 'It would mean I am fundamentally inadequate' },
      { trigger: 'incompetent', next: 'It would mean I\'m a fraud' },
      { trigger: 'fraud', next: 'It would mean I am fundamentally inadequate' },
      { trigger: 'rejected', next: 'It would mean I\'m unlovable' },
      { trigger: 'leave', next: 'It would mean I\'m unlovable' },
      { trigger: 'criticized', next: 'It would mean I\'m not good enough' },
      { trigger: 'hate', next: 'It would mean I am fundamentally flawed' },
      { trigger: 'unlovable', next: 'It would mean I am fundamentally flawed' }
    ];

    let currentThought = initialThought.toLowerCase();
    let depth = 0;
    const maxDepth = 5;

    while (depth < maxDepth) {
      const pattern = patterns.find(p => currentThought.includes(p.trigger));
      if (pattern) {
        steps.push(pattern.next);
        currentThought = pattern.next.toLowerCase();
        depth++;
      } else {
        break;
      }
    }

    return steps;
  }

  /**
   * Extract the core verdict from downward arrow steps
   */
  private extractCoreVerdict(steps: string[]): string | null {
    // If we only have the initial step, no verdict was exposed
    if (steps.length === 1) {
      return null;
    }
    
    const lastStep = steps[steps.length - 1];
    
    // Common core verdicts
    const coreVerdicts = [
      'I am fundamentally inadequate',
      'I am unlovable', 
      'I am fundamentally flawed',
      'I am bad',
      'I am worthless',
      'I am a failure',
      'I am not safe',
      'I cannot trust anyone'
    ];

    // Check if we've reached a core verdict
    for (const verdict of coreVerdicts) {
      const verdictKey = verdict.toLowerCase().split(' ').slice(2).join(' '); // e.g. "fundamentally inadequate"
      if (lastStep.toLowerCase().includes(verdictKey)) {
        return verdict;
      }
    }

    // If we went through multiple steps, return the last step as a verdict
    if (steps.length > 2) {
      return lastStep;
    }
    
    return null;
  }

  /**
   * Categorize the type of verdict
   */
  private categorizeVerdict(content: string): Verdict['type'] {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('inadequate') || lowerContent.includes('incapable') || lowerContent.includes('failure')) {
      return 'capability';
    }
    if (lowerContent.includes('unlovable') || lowerContent.includes('rejected')) {
      return 'belonging';
    }
    if (lowerContent.includes('worthless') || lowerContent.includes('bad') || lowerContent.includes('flawed')) {
      return 'self-worth';
    }
    if (lowerContent.includes('unsafe') || lowerContent.includes('danger')) {
      return 'safety';
    }
    
    return 'autonomy';
  }

  /**
   * Analyze a psychological profile using the Bonfire Blueprint methodology
   */
  analyzePsychologicalProfile(profile: PsychologicalProfile): BonfireAnalysis {
    // Step 1: Expose hidden verdicts from symptoms
    const exposedVerdicts: Verdict[] = [];
    
    for (const belief of profile.beliefs) {
      if (belief.type === 'negative-self-talk' || belief.type === 'cognitive-distortion') {
        const verdict = this.exposeVerdict(belief);
        if (verdict && !exposedVerdicts.find(v => v.content === verdict.content)) {
          exposedVerdicts.push(verdict);
        }
      }
    }

    // Step 2: Map symptoms to verdicts
    const connectedSymptoms = this.mapSymptomsToVerdicts(exposedVerdicts, profile);

    // Step 3: Recommend exposure methods (not failed models)
    const recommendedExposure = this.recommendExposureMethods(exposedVerdicts);

    // Step 4: What to avoid (failed model approaches)
    const avoidRecommendations = this.getAvoidanceRecommendations();

    return {
      profileId: profile.id,
      exposedVerdicts,
      connectedSymptoms,
      recommendedExposure,
      avoidRecommendations
    };
  }

  /**
   * Map symptoms (beliefs and behaviors) to their underlying verdicts
   */
  private mapSymptomsToVerdicts(verdicts: Verdict[], profile: PsychologicalProfile) {
    return verdicts.map(verdict => ({
      verdictId: verdict.id,
      beliefs: profile.beliefs.filter(belief => 
        this.isSymptomOfVerdict(belief.content, verdict.content)
      ),
      behaviors: profile.behaviors.filter(behavior => 
        this.isSymptomOfVerdict(behavior.description, verdict.content)
      )
    }));
  }

  /**
   * Determine if a symptom is related to a verdict
   */
  private isSymptomOfVerdict(symptom: string, verdict: string): boolean {
    const verdictThemes = this.extractThemes(verdict);
    const symptomLower = symptom.toLowerCase();
    
    // Direct matching for common patterns
    if (symptomLower.includes('not good enough') && verdict.includes('inadequate')) {
      return true;
    }
    if (symptomLower.includes('perfectionist') && verdict.includes('inadequate')) {
      return true;
    }
    if (symptomLower.includes('unlovable') && verdict.includes('unlovable')) {
      return true;
    }
    
    // Theme-based matching
    return verdictThemes.some(theme => 
      symptomLower.includes(theme) || 
      symptomLower.includes(theme.replace(' ', ''))
    );
  }

  /**
   * Extract key themes from a verdict
   */
  private extractThemes(verdict: string): string[] {
    const lowerVerdict = verdict.toLowerCase();
    const themes: string[] = [];
    
    if (lowerVerdict.includes('inadequate') || lowerVerdict.includes('failure')) {
      themes.push('incompetent', 'failing', 'not good enough', 'inadequate', 'perfectionist');
    }
    if (lowerVerdict.includes('unlovable')) {
      themes.push('rejected', 'alone', 'unloved', 'leave');
    }
    if (lowerVerdict.includes('worthless') || lowerVerdict.includes('bad')) {
      themes.push('shame', 'guilt', 'wrong');
    }
    if (lowerVerdict.includes('flawed')) {
      themes.push('hate', 'broken', 'fundamentally');
    }
    
    return themes;
  }

  /**
   * Recommend appropriate exposure methods for each verdict
   */
  private recommendExposureMethods(verdicts: Verdict[]) {
    return verdicts.map(verdict => ({
      verdict,
      method: this.selectBestMethod(verdict),
      steps: this.generateExposureSteps(verdict)
    }));
  }

  /**
   * Select the best exposure method for a specific verdict
   */
  private selectBestMethod(verdict: Verdict): 'downward-arrow' | 'cognitive-defusion' | 'attachment-exploration' | 'structural-tension' {
    // Use structural tension for capability/performance verdicts
    if (verdict.type === 'capability') {
      return 'structural-tension';
    }
    
    // Use attachment exploration for belonging verdicts
    if (verdict.type === 'belonging') {
      return 'attachment-exploration';
    }
    
    // Use cognitive defusion for self-worth verdicts
    if (verdict.type === 'self-worth') {
      return 'cognitive-defusion';
    }
    
    // Default to downward arrow for exposing unclear verdicts
    return 'downward-arrow';
  }

  /**
   * Generate specific exposure steps for a verdict
   */
  private generateExposureSteps(verdict: Verdict): string[] {
    const method = this.selectBestMethod(verdict);
    
    switch (method) {
      case 'cognitive-defusion':
        return this.exposureMethods.act.exposeVerdict(verdict);
      
      case 'attachment-exploration':
        return this.exposureMethods.attachmentTheory.exposeAttachmentVerdict(verdict);
      
      case 'structural-tension':
        return this.exposureMethods.structuralTension.downwardArrow(verdict.content);
      
      case 'downward-arrow':
      default:
        return [
          `Acknowledge the verdict: "${verdict.content}"`,
          'Stop fighting or arguing with this belief',
          'Observe how much energy you spend managing this verdict',
          'Notice what behaviors you use to compensate for this belief',
          'Practice owning this verdict without shame or resistance',
          'Watch as owning it reduces its power over your choices',
          'Commit to actions aligned with your values regardless of this belief'
        ];
    }
  }

  /**
   * What NOT to do - failed model approaches to avoid
   */
  private getAvoidanceRecommendations(): string[] {
    return [
      'Don\'t try to argue with or disprove the verdict using logic (CBT approach)',
      'Don\'t layer positive affirmations over the verdict (Positive Psychology)',
      'Don\'t seek external validation to feel better about yourself (Humanistic dependency)',
      'Don\'t suppress or avoid the uncomfortable feelings the verdict brings up',
      'Don\'t try to replace the verdict with an ideal version of yourself',
      'Don\'t perform "healing" or "authenticity" for others\' approval',
      'Don\'t use compensatory behaviors to prove the verdict wrong'
    ];
  }

  /**
   * The core blueprint method: Expose, Own, Let the Paint Drip
   */
  applyBonfireBlueprint(profile: PsychologicalProfile): TherapeuticIntervention[] {
    const analysis = this.analyzePsychologicalProfile(profile);
    const interventions: TherapeuticIntervention[] = [];

    // For each exposed verdict, apply the appropriate exposure method
    for (const recommendation of analysis.recommendedExposure) {
      const intervention: TherapeuticIntervention = {
        id: `bonfire-${Date.now()}-${Math.random()}`,
        modelId: 'bonfire-blueprint',
        target: 'verdict',
        method: recommendation.method,
        description: `Expose and disarm verdict: "${recommendation.verdict.content}"`,
        expectedOutcome: 'Reduce verdict\'s power by owning it rather than fighting it',
        success: true, // The Bonfire Blueprint approach is designed to succeed
        sideEffects: [
          'Initial discomfort as verdict becomes conscious',
          'Temporary increase in shame before liberation',
          'Disruption of familiar compensatory patterns',
          'Gradual freedom from verdict\'s unconscious control'
        ]
      };

      interventions.push(intervention);
    }

    return interventions;
  }
}