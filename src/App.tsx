import React, { useState } from 'react';
import {
  TabType,
  ScreenStack,
  MarketStall,
  InspectionRecord,
  StallCategory,
  RiskLevel,
} from './types';
import {
  INITIAL_STALLS,
  INITIAL_INSPECTIONS,
  DEFAULT_GROUP_CODE,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomTabBar } from './components/BottomTabBar';
import { CatalogScreen } from './components/CatalogScreen';
import { InspectionFormScreen } from './components/InspectionFormScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { RecordsScreen } from './components/RecordsScreen';
import { InspectionDetailsScreen } from './components/InspectionDetailsScreen';
import { AssessorEvidenceModal } from './components/AssessorEvidenceModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<TabType>('catalog');
  const [currentStack, setCurrentStack] = useState<ScreenStack>('tabs');
  const [formSubStep, setFormSubStep] = useState<'form' | 'review'>('form');

  // In-Memory Data State
  const [stalls, setStalls] = useState<MarketStall[]>(INITIAL_STALLS);
  const [records, setRecords] = useState<InspectionRecord[]>(INITIAL_INSPECTIONS);
  const [selectedRecord, setSelectedRecord] = useState<InspectionRecord | null>(null);

  // Group Verification Code (MOB-GXX-LLLL)
  const [groupCode, setGroupCode] = useState<string>(DEFAULT_GROUP_CODE);

  // In-memory Form Draft (Preserves session when switching tabs or going back)
  const [formDraft, setFormDraft] = useState<{
    vendorAlias: string;
    stallCode: string;
    category: StallCategory;
    contactNumber: string;
    riskLevel: RiskLevel;
    consentConfirmed: boolean;
    evidenceImage: string | null;
    officerNotes: string;
    timestamp: string;
  }>({
    vendorAlias: '',
    stallCode: '',
    category: 'Fresh Produce',
    contactNumber: '',
    riskLevel: 'Low',
    consentConfirmed: false,
    evidenceImage: null,
    officerNotes: '',
    timestamp: '',
  });

  // Modal & Responsive Testing States
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [fontScale, setFontScale] = useState<number>(1);
  const [deviceWidth, setDeviceWidth] = useState<'mobile-narrow' | 'mobile-standard' | 'fluid'>('mobile-standard');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Quick action from catalog: inspect a specific stall
  const handleInspectStallFromCatalog = (stall: MarketStall) => {
    setFormDraft((prev) => ({
      ...prev,
      stallCode: stall.code,
      category: stall.category,
      vendorAlias: stall.vendorAlias,
      contactNumber: stall.contactNumber,
      riskLevel: stall.priority.includes('Urgent') ? 'High' : 'Low',
    }));
    setFormSubStep('form');
    setCurrentStack('tabs');
    setCurrentTab('new-inspection');
    showToast(`Stall ${stall.code} loaded into Inspection Form`);
  };

  // Proceed from Form to Review
  const handleProceedToReview = (data: typeof formDraft) => {
    setFormDraft(data);
    setFormSubStep('review');
  };

  // Back from Review to Form (Preserves all fields)
  const handleBackToForm = () => {
    setFormSubStep('form');
  };

  // Confirm and Save Inspection to In-Memory Records
  const handleConfirmSave = () => {
    const newRecordId = `insp-${Date.now().toString().slice(-4)}`;
    const newRecord: InspectionRecord = {
      id: newRecordId,
      stallCode: formDraft.stallCode,
      vendorAlias: formDraft.vendorAlias,
      category: formDraft.category,
      contactNumber: formDraft.contactNumber,
      riskLevel: formDraft.riskLevel,
      consentConfirmed: formDraft.consentConfirmed,
      evidenceImage: formDraft.evidenceImage,
      evidenceSource: 'camera',
      timestamp: formDraft.timestamp || '30 Sep 2026, 11:00 AM CAT',
      groupVerificationCode: groupCode,
      officerNotes: formDraft.officerNotes,
      submittedAt: Date.now(),
    };

    // Add to in-memory list
    setRecords((prev) => [newRecord, ...prev]);

    // Update stall status in catalog if matched
    setStalls((prev) =>
      prev.map((s) =>
        s.code === newRecord.stallCode
          ? {
              ...s,
              status:
                newRecord.riskLevel === 'Low'
                  ? 'Compliant'
                  : newRecord.riskLevel === 'Medium'
                  ? 'Follow-up Needed'
                  : 'Flagged High Risk',
              lastInspectionDate: '2026-09-30',
            }
          : s
      )
    );

    // Reset draft form
    setFormDraft({
      vendorAlias: '',
      stallCode: '',
      category: 'Fresh Produce',
      contactNumber: '',
      riskLevel: 'Low',
      consentConfirmed: false,
      evidenceImage: null,
      officerNotes: '',
      timestamp: '',
    });

    setFormSubStep('form');
    setCurrentTab('records');
    showToast(`Inspection for stall ${newRecord.stallCode} recorded in-memory!`);
  };

  // Navigate to Inspection Details (Stack push)
  const handleSelectRecord = (record: InspectionRecord) => {
    setSelectedRecord(record);
    setCurrentStack('inspection-details');
  };

  // Back from Inspection Details (Stack pop)
  const handleBackFromDetails = () => {
    setCurrentStack('tabs');
    // Session is fully preserved!
  };

  // Handle Tab Switch
  const handleTabChange = (tab: TabType) => {
    // If currently on stack details, pop back to tabs
    if (currentStack === 'inspection-details') {
      setCurrentStack('tabs');
    }
    setCurrentTab(tab);
  };

  // Frame width container styles
  const getContainerWidthClass = () => {
    switch (deviceWidth) {
      case 'mobile-narrow':
        return 'max-w-[375px]';
      case 'mobile-standard':
        return 'max-w-[420px]';
      case 'fluid':
      default:
        return 'max-w-2xl';
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-900 flex justify-center py-0 sm:py-6 px-0 sm:px-4"
      style={{ fontSize: `${fontScale * 100}%` }}
    >
      {/* Mobile Device Viewport Container */}
      <div
        className={`w-full ${getContainerWidthClass()} bg-slate-50 min-h-screen sm:min-h-[844px] sm:max-h-[92vh] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border-0 sm:border border-slate-700/80 relative transition-all duration-300`}
      >
        {/* App Top Bar */}
        <Header
          groupCode={groupCode}
          onOpenEvidence={() => setIsEvidenceModalOpen(true)}
          fontScale={fontScale}
          onChangeFontScale={setFontScale}
          deviceWidth={deviceWidth}
          onChangeDeviceWidth={setDeviceWidth}
        />

        {/* Scrollable Screen Content */}
        <main className="flex-1 overflow-y-auto px-3.5 pt-3.5 no-scrollbar">
          {/* Stack Screen: Inspection Details */}
          {currentStack === 'inspection-details' && selectedRecord ? (
            <InspectionDetailsScreen
              record={selectedRecord}
              onBack={handleBackFromDetails}
            />
          ) : (
            /* Tab Screens */
            <>
              {currentTab === 'catalog' && (
                <CatalogScreen
                  stalls={stalls}
                  onSelectStallToInspect={handleInspectStallFromCatalog}
                  onNavigateToNewInspection={() => {
                    setCurrentTab('new-inspection');
                    setFormSubStep('form');
                  }}
                />
              )}

              {currentTab === 'new-inspection' && (
                <>
                  {formSubStep === 'form' ? (
                    <InspectionFormScreen
                      initialValues={formDraft}
                      onProceedToReview={handleProceedToReview}
                      groupCode={groupCode}
                    />
                  ) : (
                    <ReviewScreen
                      data={formDraft}
                      groupCode={groupCode}
                      onBackToEdit={handleBackToForm}
                      onConfirmSave={handleConfirmSave}
                    />
                  )}
                </>
              )}

              {currentTab === 'records' && (
                <RecordsScreen
                  records={records}
                  onSelectRecord={handleSelectRecord}
                  onNavigateToNewInspection={() => {
                    setCurrentTab('new-inspection');
                    setFormSubStep('form');
                  }}
                />
              )}
            </>
          )}
        </main>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-16 inset-x-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="bg-slate-900/95 backdrop-blur-md text-white text-xs font-medium py-2.5 px-3.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="flex-1">{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Bottom Tab Bar (shown when on main tabs) */}
        {currentStack === 'tabs' && (
          <BottomTabBar
            currentTab={currentTab}
            onTabChange={handleTabChange}
            recordCount={records.length}
          />
        )}
      </div>

      {/* Academic Documentation & Assessor Evidence Modal */}
      <AssessorEvidenceModal
        isOpen={isEvidenceModalOpen}
        onClose={() => setIsEvidenceModalOpen(false)}
        groupCode={groupCode}
        onChangeGroupCode={setGroupCode}
        onNavigateTab={handleTabChange}
        fontScale={fontScale}
        onChangeFontScale={setFontScale}
      />
    </div>
  );
}
