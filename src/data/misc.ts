import type { ActivityFeedItem, Message } from "../types";

export const recentChanges: ActivityFeedItem[] = [
  { id: "rc1", patientId: "sarah-mitchell", patientName: "Sarah Mitchell", text: "symptom worsening reported", time: "1 hour ago" },
  { id: "rc2", patientId: "emily-davis", patientName: "Emily Davis", text: "new lab uploaded", time: "3 hours ago" },
  { id: "rc3", patientId: "john-smith", patientName: "John Smith", text: "medication adherence decreased", time: "5 hours ago" },
  { id: "rc4", patientId: "michael-brown", patientName: "Michael Brown", text: "follow-up completed", time: "Yesterday" },
];

export const messages: Message[] = [
  { id: "msg1", from: "Sarah Mitchell", preview: "I've been more tired than usual this week...", time: "24 min ago", unread: true },
  { id: "msg2", from: "Nurse Ellis", preview: "Labs for Emily Davis are back, flagged for review.", time: "1 hour ago", unread: true },
  { id: "msg3", from: "John Smith", preview: "Can we move my appointment to next week?", time: "2 hours ago", unread: true },
  { id: "msg4", from: "Cardiology — Dr. Osei", preview: "Referral received for Sarah Mitchell, scheduling now.", time: "Yesterday", unread: true },
  { id: "msg5", from: "Emily Davis", preview: "Thank you for the medication update.", time: "Yesterday", unread: true },
];
