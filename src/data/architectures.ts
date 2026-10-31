export type ArchitectureDetail = {
  projectName: string;
  architectureType: string;
  overview: string;
  decisions: {
    question: string;
    choice: string;
    reasoning: string;
  }[];
  metrics: {
    label: string;
    value: string;
  }[];
  flowSteps: {
    step: string;
    actor: string;
    description: string;
  }[];
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
  };
};

export const ARCHITECTURE_DETAILS: Record<string, ArchitectureDetail> = {
  "Drishti: Agentic Scam & Fraud Intelligence": {
    projectName: "Drishti: Agentic Scam & Fraud Intelligence",
    architectureType: "Google ADK Multi-Agent Mesh & FIU-IND Compliance Rails",
    overview:
      "Real-time fraud intelligence system that intercepts Authorised Push Payment (APP) fraud—including digital arrest scams, malicious KYC APKs, and mule laundering rings—before funds settle in beneficiary accounts.",
    decisions: [
      {
        question: "Why Google ADK over LangChain / LangGraph for banking fraud?",
        choice: "Google ADK Event-Driven Agents",
        reasoning:
          "Financial fraud interception requires sub-200ms deterministic state evaluation. Google ADK integrates directly with Gemini 2.0 streaming tool calls and guarantees state safety without execution graph deadlocks.",
      },
      {
        question: "How are mule rings identified in real time?",
        choice: "Neo4j Graphiti Subgraph Hops",
        reasoning:
          "Transactions are enriched against an in-memory graph cluster. Beneficiary VPAs with high clustering coefficients or links to recently registered KYC APK endpoints trigger immediate freeze holds.",
      },
      {
        question: "How does Drishti analyze fake banking APKs without manual reverse-engineering?",
        choice: "Autonomous Static APK Sandbox Node",
        reasoning:
          "Extracts AndroidManifest.xml and dex bytecode signatures, checking for accessibility permission abuses, SMS sniffers, and known C2 IP addresses.",
      },
    ],
    metrics: [
      { label: "Interception Latency", value: "<165ms p95" },
      { label: "False Positive Escapes", value: "0 reported" },
      { label: "FIU-IND Compliance", value: "100% automated" },
      { label: "Mule Ring Detection", value: "Up to 4 hops" },
    ],
    flowSteps: [
      { step: "01", actor: "Ingress", description: "Streams raw payment and device telemetry payload into memory." },
      { step: "02", actor: "APK Sandbox", description: "Decompiles attached APK hashes and flags accessibility exploits." },
      { step: "03", actor: "Mule Hunter", description: "Queries graph database for cyclic fund laundering loops." },
      { step: "04", actor: "ADK Core", description: "Fuses multi-agent signals to assign real-time fraud probability." },
      { step: "05", actor: "Interceptor", description: "Issues instant transaction halt and generates FIU-IND report." },
    ],
    codeSnippet: {
      language: "python",
      filename: "drishti/orchestrator.py",
      code: `@agent.orchestrate
async def evaluate_transaction(ctx: TransactionContext) -> Decision:
    # Concurrent agent dispatch across specialized domains
    apk_future = ctx.dispatch("apk_sandbox", hash=ctx.apk_signature)
    mule_future = ctx.dispatch("mule_graph", vpa=ctx.beneficiary_vpa)

    apk_meta, mule_meta = await asyncio.gather(apk_future, mule_future)

    # Deterministic rule gate backed by reasoning LLM
    if mule_meta.hop_distance <= 2 or apk_meta.has_remote_admin:
        return Decision.BLOCK_AND_FREEZE(
            confidence=0.994,
            reason=f"Mule ring match {mule_meta.ring_id} & Malicious APK"
        )
    return Decision.ALLOW`,
    },
  },

  "Kaleido: Multi-Format Personalization": {
    projectName: "Kaleido: Multi-Format Personalization",
    architectureType: "Vertex AI Gemini Fact-Invariance Engine & edge-tts Pipeline",
    overview:
      "Publisher platform transforming single-source master narratives into verified, multi-format experiences (audio executive briefings, technical breakdowns, visual slides) with zero factual drift.",
    decisions: [
      {
        question: "How is hallucination prevented across personalized summaries?",
        choice: "Fact-Invariance Verification Graph",
        reasoning:
          "Before audio generation or publication, candidate output entities and quantitative claims are checked against the ground truth knowledge graph in BigQuery.",
      },
      {
        question: "How are low-latency audio briefings generated?",
        choice: "Edge-TTS with SSML Streaming",
        reasoning:
          "Avoids costly proprietary voice APIs while maintaining natural prosody, delivering audio briefings in under 1.2 seconds.",
      },
    ],
    metrics: [
      { label: "Fact Drift", value: "0.0% invariant" },
      { label: "Audio Generation", value: "1.1s stream start" },
      { label: "Format Variants", value: "5 simultaneous" },
      { label: "Cloud Engine", value: "Google Vertex AI" },
    ],
    flowSteps: [
      { step: "01", actor: "Ingest", description: "Parses original publisher copy into structured entity-claim graph." },
      { step: "02", actor: "Personalizer", description: "Adapts tone and depth for target reader cohort using Gemini 2.0." },
      { step: "03", actor: "Verifier", description: "Validates numerical facts and claims against BigQuery ground truth." },
      { step: "04", actor: "Audio Synthesis", description: "Streams natural speech via edge-tts with cohort-custom SSML." },
    ],
    codeSnippet: {
      language: "typescript",
      filename: "kaleido/verifier.ts",
      code: `export async function verifyFactInvariance(
  sourceClaims: Claim[],
  candidateOutput: string
): Promise<VerificationResult> {
  const extracted = await extractEntitiesAndClaims(candidateOutput);
  const drift = compareClaims(sourceClaims, extracted);

  if (drift.hasViolations) {
    throw new FactDriftException("Personalization violated master claims", drift);
  }

  return { verified: true, claimAlignmentScore: 1.0 };
}`,
    },
  },

  "JanSetu: Citizen-to-Policy Intelligence": {
    projectName: "JanSetu: Citizen-to-Policy Intelligence",
    architectureType: "Sovereign Digital Public Good on Google Cloud Run",
    overview:
      "Turns citizen grievances across BRICS languages and dialects into evidence-backed, explainable development priorities, comparing demand against municipal infrastructure supply and budgets.",
    decisions: [
      {
        question: "How are multi-dialect audio and text grievances processed?",
        choice: "Multilingual Embedding Clusters",
        reasoning:
          "Voice notes in vernacular dialects are transcribed and embedded into a shared vector space to cluster systemic complaints (water, power, road safety).",
      },
      {
        question: "How is civic accountability proven?",
        choice: "Budget Line Correlation Engine",
        reasoning:
          "Maps geospatial grievance density directly to municipal expenditure budget line items, exposing infrastructure deficit hotspots.",
      },
    ],
    metrics: [
      { label: "Languages Supported", value: "10+ BRICS dialects" },
      { label: "Infrastructure", value: "Google Cloud Run" },
      { label: "Grievance Categorization", value: "96.4% precision" },
      { label: "License", value: "Digital Public Good (DPG)" },
    ],
    flowSteps: [
      { step: "01", actor: "Citizen Voice", description: "Ingests multilingual voice notes and text complaints via mobile web." },
      { step: "02", actor: "Dialect Normalizer", description: "Extracts geospatial tags and core grievance intent." },
      { step: "03", actor: "Cluster Engine", description: "Aggregates localized demands to identify systemic municipal failures." },
      { step: "04", actor: "Budget Correlator", description: "Matches citizen demand against local municipal allocations." },
    ],
    codeSnippet: {
      language: "python",
      filename: "jansetu/budget_correlator.py",
      code: `def correlate_demand_with_budget(
    district_id: str,
    grievances: List[GrievanceCluster]
) -> List[InfrastructurePriority]:
    budget_allocations = load_municipal_budget(district_id)
    demand_matrix = compute_density_matrix(grievances)
    
    # Identify severe under-allocated infrastructure sectors
    priorities = []
    for sector, demand in demand_matrix.items():
        allocation = budget_allocations.get(sector, 0.0)
        gap = demand.deficit_score - allocation.per_capita_spend
        if gap > 0.4:
            priorities.append(InfrastructurePriority(sector=sector, urgency=gap))
    return sorted(priorities, key=lambda p: p.urgency, reverse=True)`,
    },
  },

  "Tanglefoot: Agent Chaos Engineering Suite": {
    projectName: "Tanglefoot: Agent Chaos Engineering Suite",
    architectureType: "Adversarial Stress-Testing & Resilience Harness for LLM Frameworks",
    overview:
      "A rigorous public benchmark and interactive dashboard evaluating LLM-based agent frameworks (LangGraph, CrewAI, AutoGen, LlamaIndex) on multi-step tasks under intentional adversarial stress.",
    decisions: [
      {
        question: "Why is chaos engineering needed for LLM agents?",
        choice: "Adversarial Tool Proxies",
        reasoning:
          "Standard agent benchmarks only measure happy paths. In production, tools fail intermittently, APIs return contradictory facts, and agents fall into self-reinforcing hallucination loops.",
      },
      {
        question: "How are circular loops detected in dynamic graphs?",
        choice: "Graph Cycle & Entropy Monitors",
        reasoning:
          "Tracks state transition entropy. When node traversal paths repeat with identical payload hashes, the loop sentry intercepts and scores the agent's self-healing ability.",
      },
    ],
    metrics: [
      { label: "Frameworks Tested", value: "LangGraph, CrewAI, AutoGen, LlamaIndex" },
      { label: "Stress Scenarios", value: "42 chaos patterns" },
      { label: "Failure Injection", value: "Dynamic proxy interposition" },
      { label: "Resilience Scoring", value: "Standardized MTTR & accuracy" },
    ],
    flowSteps: [
      { step: "01", actor: "Harness Ingress", description: "Loads multi-step task with ground-truth verification criteria." },
      { step: "02", actor: "Chaos Proxy", description: "Injects flaky latency, tool schema mutation, and false web search results." },
      { step: "03", actor: "Cycle Tracker", description: "Monitors agent state graph for infinite circular reflection loops." },
      { step: "04", actor: "Resilience Scorer", description: "Calculates recovery time, token penalty, and final goal completion rate." },
    ],
    codeSnippet: {
      language: "python",
      filename: "tanglefoot/chaos_proxy.py",
      code: `class AdversarialToolProxy:
    def __init__(self, failure_mode: ChaosMode, flake_rate: float = 0.3):
        self.mode = failure_mode
        self.flake_rate = flake_rate

    async def execute(self, tool_call: ToolCall) -> ToolResult:
        if random.random() < self.flake_rate:
            if self.mode == ChaosMode.LYING_SEARCH:
                return ToolResult(output="[ADVERSARIAL] False claim injected.")
            elif self.mode == ChaosMode.TIMEOUT_LOOP:
                raise ToolTimeoutException("Service degraded upstream")
        return await tool_call.execute_actual()`,
    },
  },

  "Mintwright: Self-Evolving Toolmaker Agent": {
    projectName: "Mintwright: Self-Evolving Toolmaker Agent",
    architectureType: "Autonomous Metaprogramming & Runtime Tool Synthesis",
    overview:
      "A self-evolving agent architecture that autonomously writes, validates, tests, and mounts its own custom tools in runtime memory when confronting novel environment hurdles.",
    decisions: [
      {
        question: "How is security preserved when an agent generates executable tools?",
        choice: "AST Static Analysis + Subprocess Isolation",
        reasoning:
          "Synthesized Python code is parsed via AST to forbid unauthorized os/sys calls, then validated in an isolated subprocess with timeout quotas before tool mounting.",
      },
      {
        question: "Why Gemini 2.0 for tool synthesis?",
        choice: "Structured Schema & Native Tool Calling",
        reasoning:
          "Gemini 2.0 generates clean Pydantic parameter schemas alongside Python implementation code in a single inference pass.",
      },
    ],
    metrics: [
      { label: "Synthesis Time", value: "<1.4s per tool" },
      { label: "Sandbox Security", value: "AST + Process Sandbox" },
      { label: "Validation Gate", value: "Auto-generated unit tests" },
      { label: "Mounting Mode", value: "Dynamic runtime memory" },
    ],
    flowSteps: [
      { step: "01", actor: "Problem Detector", description: "Identifies when current toolset cannot fulfill task requirements." },
      { step: "02", actor: "Tool Synthesizer", description: "Generates Python function and Pydantic schema with Gemini 2.0." },
      { step: "03", actor: "AST Security Gate", description: "Scans for forbidden system primitives and network exploits." },
      { step: "04", actor: "Test Sandbox", description: "Runs synthesized self-tests to prove correctness before tool registration." },
    ],
    codeSnippet: {
      language: "python",
      filename: "mintwright/forge.py",
      code: `async def synthesize_and_mount_tool(
    objective: str,
    runtime_env: AgentEnvironment
) -> Callable:
    # 1. Synthesize implementation and tests
    code, pydantic_schema = await forge_llm.generate_tool(objective)
    
    # 2. Strict AST security analysis
    verify_ast_safety(code, allowed_modules={"math", "datetime", "re", "json"})
    
    # 3. Dynamic compilation and registration
    tool_callable = compile_tool(code, pydantic_schema)
    runtime_env.register_tool(tool_callable)
    return tool_callable`,
    },
  },

  "Hierarchical Code Agent": {
    projectName: "Hierarchical Code Agent",
    architectureType: "LangGraph Multi-Agent Hierarchy & DSPy Optimization Loop",
    overview:
      "Enterprise production multi-agent system delivering autonomous Python generation with built-in review, compliance, and DSPy optimization loops. Reduced software coding time by 86% at Dentsu.",
    decisions: [
      {
        question: "Why replace manual prompts with DSPy optimizers?",
        choice: "Compiled DSPy Teleprompter",
        reasoning:
          "Manual prompt engineering breaks with model updates. DSPy compiles optimal few-shot demonstrations and prompt instructions against test metrics, boosting compliance adherence by 28%.",
      },
      {
        question: "Why a hierarchical multi-agent structure?",
        choice: "Generator -> Reviewer -> Feedback Supervisor",
        reasoning:
          "Decoupling generation from critique prevents confirmation bias and catches edge-case security vulnerabilities early.",
      },
    ],
    metrics: [
      { label: "Coding Time", value: "86% reduction" },
      { label: "Compliance Adherence", value: "+28% increase" },
      { label: "Escape Bugs", value: "0 critical security flaws" },
      { label: "Framework", value: "LangGraph + DSPy" },
    ],
    flowSteps: [
      { step: "01", actor: "Supervisor", description: "Parses ticket requirements and creates task execution dag." },
      { step: "02", actor: "Generator Agent", description: "Produces typed Python functions with docstrings and unit tests." },
      { step: "03", actor: "Reviewer Agent", description: "Audits security, performance, and style compliance standards." },
      { step: "04", actor: "DSPy Optimizer", description: "Re-compiles prompts when edge-case compliance tests fail." },
    ],
    codeSnippet: {
      language: "python",
      filename: "code_agent/graph.py",
      code: `workflow = StateGraph(DevelopmentState)

workflow.add_node("generator", generate_code_node)
workflow.add_node("reviewer", review_code_node)
workflow.add_node("dspy_optimizer", optimize_prompt_node)

workflow.add_conditional_edges(
    "reviewer",
    evaluate_compliance_gate,
    {
        "pass": "merge_approval",
        "retry_with_optimization": "dspy_optimizer",
        "retry_code": "generator"
    }
)
app = workflow.compile()`,
    },
  },
};

