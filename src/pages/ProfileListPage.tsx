import { useEffect, useRef, useState } from "react";

type StoryName = "Default" | "IntegrationTest";

function getHashParam(name: string): string {
  try {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get(name) || "";
  } catch {
    return "";
  }
}

const defaultArgs = {
  apiBaseUrl: "http://localhost:3001",
  authToken: "",
  jobId: "",
  utmMedium: "",
  utmCampaign: "",
  sourcerBaseUrl: "https://qa-sourcing.jobtarget.com",
  resultLimit: 10,
};

export default function ProfileListPage() {
  const ref = useRef<any>(null);
  console.log('ref', ref)
  const [activeStory, setActiveStory] = useState<StoryName>("Default");
  const [events, setEvents] = useState<any[]>([]);

  const [apiBaseUrl, setApiBaseUrl] = useState(defaultArgs.apiBaseUrl);
  const [authToken, setAuthToken] = useState(defaultArgs.authToken);
  const [jobId, setJobId] = useState(defaultArgs.jobId);
  const [utmMedium, setUtmMedium] = useState(defaultArgs.utmMedium);
  const [utmCampaign, setUtmCampaign] = useState(defaultArgs.utmCampaign);
  const [sourcerBaseUrl, setSourcerBaseUrl] = useState(defaultArgs.sourcerBaseUrl);
  const [resultLimit, setResultLimit] = useState(defaultArgs.resultLimit);

  function loadStory(name: StoryName) {
    setActiveStory(name);
    setEvents([]);
    if (name === "IntegrationTest") {
      const hashToken = getHashParam("token");
      const hashJobId = getHashParam("jobId");
      if (hashToken) setAuthToken(hashToken);
      if (hashJobId) setJobId(hashJobId);
    }
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handler = (e: CustomEvent) => {
      setEvents((prev) => [e.detail, ...prev]);
    };

    el.addEventListener("profileClick", handler);
    return () => el.removeEventListener("profileClick", handler);
  }, []);

  const resolvedToken = activeStory === "IntegrationTest"
    ? (authToken || getHashParam("token"))
    : authToken;

  const resolvedJobId = activeStory === "IntegrationTest"
    ? (jobId || getHashParam("jobId"))
    : jobId;

  const isReady = !!(resolvedToken && resolvedJobId);

  const storyButtonStyle = (name: StoryName): React.CSSProperties => ({
    padding: "6px 12px",
    marginRight: 8,
    marginBottom: 8,
    border: "1px solid #ccc",
    borderRadius: 4,
    cursor: "pointer",
    background: activeStory === name ? "#0d6efd" : "#fff",
    color: activeStory === name ? "#fff" : "#333",
    fontWeight: activeStory === name ? 600 : 400,
  });

  return (
    <div style={{ display: "flex", gap: 24 }}>
      {/* Controls */}
      <div style={{ width: 400, borderRight: "1px solid #ddd", paddingRight: 24 }}>
        <h2>Stories</h2>

        <div style={{ marginBottom: 16 }}>
          {(["Default", "IntegrationTest"] as StoryName[]).map((name) => (
            <button
              key={name}
              type="button"
              style={storyButtonStyle(name)}
              onClick={() => loadStory(name)}
            >
              {name}
            </button>
          ))}
        </div>

        {activeStory === "IntegrationTest" && (
          <p style={{ fontSize: 13, color: "#666", marginBottom: 12 }}>
            Reads <code>token</code> and <code>jobId</code> from URL hash automatically.
            Example: <code>#token=eyJ...&amp;jobId=12345</code>
          </p>
        )}

        <h2>Props</h2>

        <div>
          <label>API Base URL</label>
          <input
            value={apiBaseUrl}
            onChange={(e) => setApiBaseUrl(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Auth Token</label>
          <textarea
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            rows={4}
            placeholder="Paste jtToken cookie from qa-sourcing.jobtarget.com"
            style={{ width: "100%", fontFamily: "monospace", fontSize: 12 }}
          />
        </div>

        <div>
          <label>Job ID</label>
          <input
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Sourcer Base URL</label>
          <input
            value={sourcerBaseUrl}
            onChange={(e) => setSourcerBaseUrl(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Result Limit (1–50)</label>
          <input
            type="number"
            min={1}
            max={50}
            value={resultLimit}
            onChange={(e) => setResultLimit(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>UTM Medium</label>
          <input
            value={utmMedium}
            onChange={(e) => setUtmMedium(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>UTM Campaign</label>
          <input
            value={utmCampaign}
            onChange={(e) => setUtmCampaign(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <hr />

        <h3>Events</h3>

        <pre
          style={{
            background: "#111",
            color: "#0f0",
            padding: 12,
            overflow: "auto",
            maxHeight: 200,
          }}
        >
          {events.length === 0
            ? "// no events yet"
            : JSON.stringify(events, null, 2)}
        </pre>
      </div>

      {/* Preview */}
      <div style={{ flex: 1 }}>
        <h2>Preview</h2>

        {activeStory === "IntegrationTest" && (
          <div
            className={`alert ${isReady ? "alert-success" : "alert-warning"} small mb-3`}
            style={{ fontSize: 13 }}
          >
            <strong>{isReady ? "Ready" : "Missing Config"}</strong>
            <br />
            API: <code>{apiBaseUrl}</code> &middot;{" "}
            Token:{" "}
            {resolvedToken ? (
              <code>✓ {resolvedToken.length} chars</code>
            ) : (
              <code>✗ paste into Auth Token or add #token=... to URL</code>
            )}{" "}
            &middot; Job ID:{" "}
            {resolvedJobId ? (
              <code>{resolvedJobId}</code>
            ) : (
              <code>✗ required</code>
            )}
          </div>
        )}

        <sourcer-profile-list
          ref={ref}
          apiBaseUrl={apiBaseUrl}
          authToken={resolvedToken || undefined}
          jobId={resolvedJobId || undefined}
          sourcerBaseUrl={sourcerBaseUrl || undefined}
          utmMedium={utmMedium || undefined}
          utmCampaign={utmCampaign || undefined}
          resultLimit={resultLimit}
        />
      </div>
    </div>
  );
}
