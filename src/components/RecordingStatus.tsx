"use client";

import { Mic, MicOff, Loader2 } from "lucide-react";

interface RecordingStatusProps {
  isRecording: boolean;
  isProcessing: boolean;
  recordingTime: number;
  className?: string;
}

export default function RecordingStatus({
  isRecording,
  isProcessing,
  recordingTime,
  className = "",
}: RecordingStatusProps) {
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Get status info
  const getStatusInfo = () => {
    if (isProcessing) {
      return {
        icon: <Loader2 className="w-6 h-6 animate-spin text-[#5BA3E8]" />,
        title: "Processing your recording...",
        message: "Please wait while we analyze your pronunciation",
        className:
          "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      };
    }

    if (isRecording) {
      return {
        icon: <Mic className="w-6 h-6 text-red-500 animate-pulse" />,
        title: `Recording... ${formatTime(recordingTime)}`,
        message: "Speak clearly into your microphone",
        className:
          "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
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
          <h3 className="text-lg md:text-xl font-semibold">
            {statusInfo.title}
          </h3>
        </div>

        {/* Message */}
        <p className="text-sm md:text-base text-muted-foreground">
          {statusInfo.message}
        </p>

        {/* Recording instructions */}
        {isRecording && (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Recording in progress...</span>
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
