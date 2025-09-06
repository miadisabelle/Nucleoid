/**
 * Example usage of the Bonfire Blueprint psychological reasoning framework
 * 
 * This demonstrates how to use the implemented system to analyze psychological
 * patterns and expose underlying verdicts rather than patching symptoms.
 */

import { 
  BonfireBlueprint, 
  createBelief, 
  createBehavior, 
  createVerdict,
  quickAnalysis,
  exposeVerdictFromSymptom
} from './psychology';

// Example 1: Quick analysis of symptoms
console.log('=== Example 1: Quick Symptom Analysis ===');
const symptoms = [
  "I'm afraid I'll fail at this presentation",
  "Everyone will see that I'm a fraud",
  "I always mess things up"
];

const quickResult = quickAnalysis(symptoms);
console.log('Exposed verdicts:', quickResult.exposedVerdicts.length);
console.log('Avoidance recommendations:', quickResult.avoidRecommendations.slice(0, 2));

// Example 2: Expose single verdict
console.log('\n=== Example 2: Single Verdict Exposure ===');
const verdict = exposeVerdictFromSymptom("I hate myself");
console.log('Exposed verdict:', verdict?.content);
console.log('Verdict type:', verdict?.type);

// Example 3: Full Bonfire Blueprint Analysis
console.log('\n=== Example 3: Complete Bonfire Analysis ===');
const blueprint = new BonfireBlueprint();

const profile = {
  id: 'example-profile',
  verdicts: [],
  beliefs: [
    createBelief("I'm not good enough", "negative-self-talk"),
    createBelief("People will leave me if they see the real me", "negative-self-talk")
  ],
  behaviors: [
    createBehavior("Working excessively to prove worth", "compensatory"),
    createBehavior("Avoiding close relationships", "avoidant")
  ],
  interventions: [],
  progress: []
};

const analysis = blueprint.analyzePsychologicalProfile(profile);
console.log('Analysis results:');
console.log('- Exposed verdicts:', analysis.exposedVerdicts.length);
console.log('- Connected symptoms:', analysis.connectedSymptoms.length);
console.log('- Recommended exposures:', analysis.recommendedExposure.length);

if (analysis.exposedVerdicts.length > 0) {
  console.log('\nFirst exposed verdict:', analysis.exposedVerdicts[0].content);
  
  if (analysis.recommendedExposure.length > 0) {
    console.log('Recommended method:', analysis.recommendedExposure[0].method);
    console.log('First exposure step:', analysis.recommendedExposure[0].steps[0]);
  }
}

// Example 4: Therapeutic Interventions
console.log('\n=== Example 4: Therapeutic Interventions ===');
const interventions = blueprint.applyBonfireBlueprint(profile);
console.log('Generated interventions:', interventions.length);

if (interventions.length > 0) {
  const intervention = interventions[0];
  console.log('Intervention target:', intervention.target);
  console.log('Expected outcome:', intervention.expectedOutcome);
  console.log('Success rate:', intervention.success ? 'High' : 'Low');
}

console.log('\n=== Bonfire Blueprint Principle ===');
console.log('Rather than patching symptoms, expose and own the underlying verdict.');
console.log('This robs the verdict of its unconscious power over behavior.');
console.log('The paint is allowed to drip, revealing the structure beneath.');