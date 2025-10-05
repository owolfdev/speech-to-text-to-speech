"use client";

import { Mic, MicOff, Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface RecordingStatusProps {
  isRecording: boolean;
  isProcessing: boolean;
  recordingTime: number;
  maxRecordingTime?: number;
  isNearLimit?: boolean;
  isRequestingPermission?: boolean;
  className?: string;
}

export default function RecordingStatus({
  isRecording,
  isProcessing,
  recordingTime,
  maxRecordingTime = 30,
  isNearLimit = false,
  isRequestingPermission = false,
  className = "",
}: RecordingStatusProps) {
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Get status info
  const getStatusInfo = (): {
    icon: ReactNode;
    title: ReactNode;
    message: string;
    className: string;
  } => {
    if (isProcessing) {
      return {
        icon: <Loader2 className="w-6 h-6 animate-spin text-[#5BA3E8]" />,
        title: "Processing your recording...",
        message: "Please wait while we analyze your pronunciation",
        className:
          "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      };
    }

    if (isRequestingPermission) {
      return {
        icon: <Loader2 className="w-6 h-6 animate-spin" />,
        title: "✋ Please wait. Requesting microphone access...",
        message: "Please allow microphone access to start recording",
        className:
          "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
      };
    }

    if (isRecording) {
      return {
        icon: <Mic className="w-6 h-6 text-green-500 animate-pulse" />,
        title: (
          <span className="text-2xl font-bold text-green-600 dark:text-green-400 animate-pulse">
            Recording... {formatTime(recordingTime)}
          </span>
        ),
        message: "Speak clearly into your microphone",
        className:
          "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
      };
    }

    return {
      icon: <MicOff className="w-6 h-6 text-muted-foreground" />,
      title: "Ready to record",
      message: "Click the Record button above to start",
      className:
        "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800",
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <div
      className={`p-4 md:p-6 rounded-xl border-2 transition-all duration-300 ${statusInfo.className} ${className}`}
    >
      <div className="text-center space-y-3">
        {/* Icon and title */}
        <div className="flex items-center justify-center gap-3">
          {statusInfo.icon}
          <div className="text-lg md:text-xl font-semibold">
            {statusInfo.title}
          </div>
        </div>

        {/* Message */}
        <p className="text-sm md:text-base text-muted-foreground">
          {statusInfo.message}
        </p>

        {/* Recording instructions */}
        {isRecording && (
          <div className="space-y-3">
            {/* Progress bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300 bg-green-500"
                style={{
                  width: `${Math.min(
                    (recordingTime / maxRecordingTime) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>

            <p className="text-xs text-muted-foreground">
              Click &quot;Stop Recording&quot; when you&apos;re finished
            </p>
          </div>
        )}

        {/* Processing instructions */}
        {isProcessing && (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Analyzing pronunciation...</span>
            </div>
            <p className="text-xs text-muted-foreground">
              This may take a few seconds
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
