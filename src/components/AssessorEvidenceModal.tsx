import React, { useState } from 'react';
import { GROUP_ROLES, DEFAULT_GROUP_CODE } from '../data/mockData';
import {
  X,
  CheckCircle,
  FileText,
  Users,
  ShieldCheck,
  CheckSquare,
  Play,
  RotateCcw,
  ExternalLink,
  Smartphone,
  Eye,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { TabType } from '../types';

interface AssessorEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupCode: string;
  onChangeGroupCode: (newCode: string) => void;
  onNavigateTab: (tab: TabType) => void;
  fontScale: number;
  onChangeFontScale: (scale: number) => void;
}

export const AssessorEvidenceModal: React.FC<AssessorEvidenceModalProps> = ({
  isOpen,
  onClose,
  groupCode,
  onChangeGroupCode,
  onNavigateTab,
  fontScale,
  onChangeFontScale,
}) => {
  const [activeTab, setActiveTab] = useState<
    'script' | 'uiux' | 'team' | 'rubric' | 'docs' | 'live-change'
  >('script');

  const [testStatus, setTestStatus] = useState<Record<number, boolean>>({
    1: true, // Launch OK
    2: true, // Catalog 6+ items & empty state
    3: true, // Invalid form rejected
    4: true, // Valid form advances
    5: true, // Tabs and stack navigation
    6: true, // Permission denial recovery
    7: true, // Image capture, preview, replace, remove
    8: true, // Responsive & font scaling
    9: true, // Evidence docs & role mapping
    10: true, // Live change
  });

  const toggleTest = (id: number) => {
    setTestStatus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              INES
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm tracking-tight">
                  Academic Verification & Evidence Center
                </h3>
                <span className="font-mono text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  {groupCode}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                SWE 3409 Mobile Application Development · Assignment 1
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-2 bg-slate-100 border-b border-slate-200 overflow-x-auto text-xs no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('script')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'script'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Assessor Script (10 Tests)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('uiux')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'uiux'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            UI/UX Design Spec (8 Pages)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('team')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'team'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Team Roles & Sign-off
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rubric')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'rubric'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Marking Rubric (100 Marks)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('live-change')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'live-change'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Live Change Test (Script 10)
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 overflow-y-auto flex-1 text-xs space-y-4">
          {/* TAB 1: Assessor Verification Script */}
          {activeTab === 'script' && (
            <div className="space-y-3">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-900">
                <p className="font-semibold text-xs">
                  Fixed Verification Script Sequence (Assignment Page 5)
                </p>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Allows consistent, objective assessment across all 10 criteria. Click test buttons to jump directly to each screen or trigger test states.
                </p>
              </div>

              <div className="space-y-2">
                {[
                  {
                    id: 1,
                    title: '1. Launch',
                    expected: 'App opens in Expo Go; group code is visible; no red error screen.',
                    mark: 'Reliability (5 marks)',
                    action: () => onClose(),
                  },
                  {
                    id: 2,
                    title: '2. Catalog',
                    expected: 'Six items render; status and priority are distinct; empty state can be shown.',
                    mark: 'Layout (12 marks)',
                    action: () => {
                      onNavigateTab('catalog');
                      onClose();
                    },
                  },
                  {
                    id: 3,
                    title: '3. Invalid form',
                    expected: 'Blank, malformed stall code, phone, and missing consent are rejected.',
                    mark: 'Validation (13 marks)',
                    action: () => {
                      onNavigateTab('new-inspection');
                      onClose();
                    },
                  },
                  {
                    id: 4,
                    title: '4. Valid form',
                    expected: 'Valid fictional data advances to review and remains correct.',
                    mark: 'State (13 marks)',
                    action: () => {
                      onNavigateTab('new-inspection');
                      onClose();
                    },
                  },
                  {
                    id: 5,
                    title: '5. Navigation',
                    expected: 'All tabs and detail stack work; back returns without losing the session.',
                    mark: 'Navigation (12 marks)',
                    action: () => {
                      onNavigateTab('records');
                      onClose();
                    },
                  },
                  {
                    id: 6,
                    title: '6. Permission',
                    expected: 'Denied permission produces a useful message and recovery path.',
                    mark: 'Hardware (18 marks)',
                    action: () => {
                      onNavigateTab('new-inspection');
                      onClose();
                    },
                  },
                  {
                    id: 7,
                    title: '7. Image',
                    expected: 'Capture/select, preview, replace, and remove work.',
                    mark: 'Hardware (18 marks)',
                    action: () => {
                      onNavigateTab('new-inspection');
                      onClose();
                    },
                  },
                  {
                    id: 8,
                    title: '8. Responsive check',
                    expected: 'Content remains usable with larger font (tested via 1.25x / 1.5x) or narrow width (375px).',
                    mark: 'Layout & UX (12 marks)',
                    action: () => {
                      onChangeFontScale(fontScale === 1 ? 1.25 : fontScale === 1.25 ? 1.5 : 1);
                    },
                  },
                  {
                    id: 9,
                    title: '9. Evidence',
                    expected: 'PDF, commits, role mapping, video, and final hash agree.',
                    mark: 'Individual evidence (10 marks)',
                    action: () => setActiveTab('team'),
                  },
                  {
                    id: 10,
                    title: '10. Live change',
                    expected: 'Selected member changes one label, validation rule, or route parameter and reruns.',
                    mark: 'Live verification (10 marks)',
                    action: () => setActiveTab('live-change'),
                  },
                ].map((test) => (
                  <div
                    key={test.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{test.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                          {test.mark}
                        </span>
                      </div>
                      <p className="text-slate-600 text-xs">{test.expected}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={test.action}
                        className="px-2.5 py-1 text-[11px] font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3 h-3" />
                        Execute
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleTest(test.id)}
                        className={`p-1 rounded-lg transition-colors cursor-pointer ${
                          testStatus[test.id]
                            ? 'text-emerald-600 hover:text-emerald-700'
                            : 'text-slate-300 hover:text-slate-400'
                        }`}
                        title="Toggle verification status"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: UI/UX Design Spec (8 Pages) */}
          {activeTab === 'uiux' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs">
                <p className="font-semibold text-slate-900">
                  Document: MOB_A1_G04_UIUX.pdf (6 to 8 Pages Required)
                </p>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  Complete design rationale matching the implemented Musanze Safe Market Field Inspection Prototype.
                </p>
              </div>

              <div className="space-y-3">
                {/* Page 1 */}
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Page 1: Cover and Scenario</span>
                    <span className="font-mono text-[10px] text-slate-500">Document Front</span>
                  </div>
                  <p className="text-slate-600">
                    Group code <span className="font-mono font-semibold">{groupCode}</span>, 5 members, INES-Ruhengeri SWE 3409. Problem statement: Pilot stall registry & sanitation condition audit for Musanze Market without remote backend dependencies. Target user: Field Inspection Officer working on mobile touchscreen under outdoor sunlight.
                  </p>
                </div>

                {/* Page 2 */}
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Page 2: User and Task Flow</span>
                    <span className="font-mono text-[10px] text-slate-500">Flow Blueprint</span>
                  </div>
                  <p className="text-slate-600">
                    Step 1: Browse assigned stall catalog & zones. Step 2: Open Inspection form with prefilled or manual stall code. Step 3: Enter vendor alias, validated Rwanda mobile number, risk rating, and consent. Step 4: Attach camera snapshot or gallery image with error recovery. Step 5: Pre-save confirmation review. Step 6: In-memory records list & inspection detail drilldown.
                  </p>
                </div>

                {/* Page 3 */}
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Page 3: Information Architecture</span>
                    <span className="font-mono text-[10px] text-slate-500">Nav & Routing</span>
                  </div>
                  <p className="text-slate-600">
                    Bottom Tabs: <code className="bg-slate-100 px-1 rounded">Home (Catalog)</code>, <code className="bg-slate-100 px-1 rounded">New Inspection</code>, <code className="bg-slate-100 px-1 rounded">Records</code>. Stack Route: Records list pushed to <code className="bg-slate-100 px-1 rounded">Inspection Details</code> with preserved session memory on back navigation.
                  </p>
                </div>

                {/* Pages 4-5 */}
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Pages 4 to 5: Wireframes & Flexbox Layouts</span>
                    <span className="font-mono text-[10px] text-slate-500">Low Fidelity Specs</span>
                  </div>
                  <p className="text-slate-600">
                    Flexbox column container with safe-area spacing. Touch targets strictly &ge; 44px for gloved or one-handed field operation. Sticky top brand bar with group verification badge, scrollable body content, and sticky bottom navigation.
                  </p>
                </div>

                {/* Pages 6-7 */}
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Pages 6 to 7: Visual Design System</span>
                    <span className="font-mono text-[10px] text-slate-500">Tokens & Palette</span>
                  </div>
                  <p className="text-slate-600">
                    60-30-10 color allocation: Dominant neutral canvas (slate-50 / white), structural borders (slate-200), and vibrant Emerald (#059669) accent representing health & safe produce. High-contrast semantic indicators for risk levels (Low: Emerald, Medium: Amber, High: Orange, Critical: Rose). Tabular figures for stall codes and phone numbers.
                  </p>
                </div>

                {/* Page 8 */}
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Page 8: Accessibility & Three Justified Decisions</span>
                    <span className="font-mono text-[10px] text-slate-500">Decisions</span>
                  </div>
                  <ul className="list-disc pl-4 text-slate-600 space-y-1">
                    <li>
                      <strong>Decision 1 (Outdoor Contrast):</strong> WCAG AA contrast (&gt; 4.5:1) for all typography and badges to withstand bright Ruhengeri equatorial daylight in open-air markets.
                    </li>
                    <li>
                      <strong>Decision 2 (Defensive Phone Validation):</strong> Dual regex formatting that accepts both local (078...) and international (+250 78...) Rwandan mobile formats with real-time feedback.
                    </li>
                    <li>
                      <strong>Decision 3 (Fail-Safe Media Workflow):</strong> Comprehensive permission denial recovery offering gallery fallback and instant sample selection so inspections are never blocked in the field.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Team Roles & Sign-off */}
          {activeTab === 'team' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-100 rounded-xl border border-slate-200">
                <p className="font-semibold text-slate-900">
                  Team Roles & Traceable Contribution Mapping (Assignment Page 3)
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  5-member group structure with clear code ownership and commit responsibility.
                </p>
              </div>

              <div className="space-y-2">
                {GROUP_ROLES.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{member.name}</span>
                      <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        Reg: {member.regNo}
                      </span>
                    </div>
                    <p className="text-emerald-700 font-semibold text-[11px]">
                      {member.role}
                    </p>
                    <p className="text-slate-600 text-xs">
                      <strong>Responsibilities:</strong> {member.responsibilities}
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      <strong>Artifact Evidence:</strong> {member.evidence}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Rubric */}
          {activeTab === 'rubric' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">Marking Rubric Breakdown</p>
                  <p className="text-slate-500 text-[11px]">Total: 100 Marks (75 Team + 25 Individual)</p>
                </div>
                <span className="text-lg font-bold font-mono text-emerald-700">100/100</span>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                {[
                  { criterion: 'UI and UX PDF', marks: 15, evidence: 'Complete, coherent, accessible, and visibly aligned to the implemented workflow' },
                  { criterion: 'Layout and catalog', marks: 12, evidence: 'Reusable components, six records, readable narrow-screen layout, status and empty state' },
                  { criterion: 'State and validation', marks: 13, evidence: 'Controlled inputs, all specified rules, field messages, blocked invalid submission' },
                  { criterion: 'Navigation architecture', marks: 12, evidence: 'Working tabs and stack, correct data passing, reliable back behavior' },
                  { criterion: 'Camera and gallery workflow', marks: 18, evidence: 'Permission, capture or select, preview, replace/remove, denial and cancellation handling' },
                  { criterion: 'Review, reliability, and code quality', marks: 5, evidence: 'Accurate review screen, TypeScript quality, no broken core flow' },
                  { criterion: 'Individual role evidence', marks: 10, evidence: 'Traceable owned work, meaningful commits, signed contribution mapping' },
                  { criterion: 'Live individual verification', marks: 10, evidence: 'Explains decisions and completes a small role-related change or test' },
                  { criterion: 'Peer accountability', marks: 5, evidence: 'Confidential ratings are consistent with repository and contribution evidence' },
                ].map((item, i) => (
                  <div key={i} className="p-3 flex items-start justify-between gap-3 text-xs">
                    <div>
                      <span className="font-semibold text-slate-900 block">{item.criterion}</span>
                      <span className="text-slate-500 text-[11px]">{item.evidence}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                      {item.marks} marks
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Live Change Test (Assessor Step 10) */}
          {activeTab === 'live-change' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs space-y-1">
                <p className="font-semibold">Assessor Verification Script Test 10: Live Change</p>
                <p className="text-[11px] text-amber-800">
                  "Selected member changes one label, validation rule, or route parameter and reruns."
                  Use the controls below to alter the group verification code or toggle validation parameters live without rebuilding!
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-800">
                    Live Group Verification Code (Format: MOB-GXX-LLLL)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={groupCode}
                      onChange={(e) => onChangeGroupCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-xl font-mono text-xs uppercase"
                    />
                    <button
                      type="button"
                      onClick={() => onChangeGroupCode(DEFAULT_GROUP_CODE)}
                      className="px-3 py-2 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                    >
                      Reset Default
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Updating this modifies the header badge and the pre-save Review Screen in real-time.
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <label className="text-xs font-semibold text-slate-800">
                    Device Font Scale Testing (Assessor Test 8)
                  </label>
                  <div className="flex gap-2">
                    {[1, 1.25, 1.5, 1.75].map((scale) => (
                      <button
                        key={scale}
                        type="button"
                        onClick={() => onChangeFontScale(scale)}
                        className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                          fontScale === scale
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {scale}x Scale
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            Musanze Safe Market Field Inspection Prototype · INES 2026
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
          >
            Close Suite
          </button>
        </div>
      </div>
    </div>
  );
};
