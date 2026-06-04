import { useEffect, useRef, useState } from "react";

const mockUnlockedProfile = {
  id: "prof-001",
  source: "PeopleDataLabs",
  firstName: "Sarah",
  lastName: "Johnson",
  fullName: "Sarah Johnson",
  currentTitle: "Senior Software Engineer",
  currentEmployer: "Tech Solutions Inc",
  locationNames: ["Boston, MA"],
  skills: ["JavaScript", "React", "Node.js", "TypeScript", "AWS", "Docker"],
  unlocked: true,
  saved: true,
  hasInvites: false,
  recentlyActive: false,
  experience: [],
  education: [],
  emails: [],
};

const mockLockedProfile = {
  id: "prof-002",
  source: "PeopleDataLabs",
  firstName: "John",
  lastName: "Doe",
  fullName: "",
  currentTitle: "Product Manager",
  currentEmployer: "Acme Corp",
  locationNames: ["New York, NY"],
  skills: ["Product Strategy", "Agile", "SQL", "Data Analysis"],
  unlocked: false,
  saved: false,
  hasInvites: true,
  recentlyActive: false,
  experience: [],
  education: [],
  emails: [],
};

const mockRecentlyActiveProfile = {
  id: "prof-003",
  source: "PeopleDataLabs",
  firstName: "Maria",
  lastName: "Garcia",
  fullName: "Maria Garcia",
  currentTitle: "UX Designer",
  currentEmployer: "Design Studio",
  locationNames: ["San Francisco, CA"],
  skills: [
    "Figma",
    "User Research",
    "Prototyping",
    "CSS",
    "HTML",
    "Accessibility",
    "Design Systems",
  ],
  unlocked: true,
  saved: false,
  hasInvites: false,
  recentlyActive: true,
  experience: [],
  education: [],
  emails: [],
};

const mockMinimalProfile = {
  id: "prof-004",
  source: "PeopleDataLabs",
  firstName: "Alex",
  lastName: "",
  fullName: "",
  currentTitle: "",
  currentEmployer: "",
  locationNames: [],
  skills: [],
  unlocked: false,
  saved: false,
  hasInvites: false,
  recentlyActive: false,
  experience: [],
  education: [],
  emails: [],
};

type StoryName = "Unlocked" | "Locked" | "RecentlyActive" | "WithJobContext" | "MinimalData";

const stories: Record<
  StoryName,
  { profile: object; sourcerBaseUrl: string; jobId: string; utmMedium: string; utmCampaign: string }
> = {
  Unlocked: {
    profile: mockUnlockedProfile,
    sourcerBaseUrl: "https://qa-sourcing.jobtarget.com",
    jobId: "",
    utmMedium: "",
    utmCampaign: "",
  },
  Locked: {
    profile: mockLockedProfile,
    sourcerBaseUrl: "https://qa-sourcing.jobtarget.com",
    jobId: "",
    utmMedium: "",
    utmCampaign: "",
  },
  RecentlyActive: {
    profile: mockRecentlyActiveProfile,
    sourcerBaseUrl: "https://qa-sourcing.jobtarget.com",
    jobId: "",
    utmMedium: "",
    utmCampaign: "",
  },
  WithJobContext: {
    profile: mockUnlockedProfile,
    sourcerBaseUrl: "https://qa-sourcing.jobtarget.com",
    jobId: "12345",
    utmMedium: "",
    utmCampaign: "",
  },
  MinimalData: {
    profile: mockMinimalProfile,
    sourcerBaseUrl: "",
    jobId: "",
    utmMedium: "",
    utmCampaign: "",
  },
};

export default function ProfileCardPage() {
  const ref = useRef<any>(null);
  const [activeStory, setActiveStory] = useState<StoryName>("Unlocked");

  const [profile, setProfile] = useState(
    JSON.stringify(stories.Unlocked.profile, null, 2)
  );
  const [sourcerBaseUrl, setSourcerBaseUrl] = useState(stories.Unlocked.sourcerBaseUrl);
  const [jobId, setJobId] = useState(stories.Unlocked.jobId);
  const [utmCampaign, setUtmCampaign] = useState(stories.Unlocked.utmCampaign);
  const [utmMedium, setUtmMedium] = useState(stories.Unlocked.utmMedium);
  const [events, setEvents] = useState<any[]>([]);

  function loadStory(name: StoryName) {
    const s = stories[name];
    setActiveStory(name);
    setProfile(JSON.stringify(s.profile, null, 2));
    setSourcerBaseUrl(s.sourcerBaseUrl);
    setJobId(s.jobId);
    setUtmMedium(s.utmMedium);
    setUtmCampaign(s.utmCampaign);
    setEvents([]);
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handler = (e: CustomEvent) => {
      setEvents((prev) => [e.detail, ...prev]);
    };

    el.addEventListener("profileClick", handler);
    return () => {
      el.removeEventListener("profileClick", handler);
    };
  }, []);

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
      <div
        style={{
          width: 400,
          borderRight: "1px solid #ddd",
          paddingRight: 24,
        }}
      >
        <h2>Stories</h2>

        <div style={{ marginBottom: 16 }}>
          {(Object.keys(stories) as StoryName[]).map((name) => (
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

        <h2>Props</h2>

        <div>
          <label>Profile JSON</label>
          <textarea
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            rows={20}
            style={{ width: "100%", fontFamily: "monospace" }}
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
          <label>Job ID</label>
          <input
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
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

        <div>
          <label>UTM Medium</label>
          <input
            value={utmMedium}
            onChange={(e) => setUtmMedium(e.target.value)}
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

        <div style={{ width: 400 }}>
          <sourcer-profile-card
            ref={ref}
            profile={profile}
            sourcerBaseUrl={sourcerBaseUrl || undefined}
            jobId={jobId || undefined}
            utmCampaign={utmCampaign || undefined}
            utmMedium={utmMedium}
          />
        </div>
      </div>
    </div>
  );
}
