"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText } from "lucide-react";

interface FileUploadProps {
  accept?: string;
  maxSizeMb?: number;
  maxFiles?: number;
  label?: string;
  onFiles: (files: File[]) => void;
}

const DEFAULT_ACCEPT =
  ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.jpg,.jpeg,.png,.gif,.mp4,.webm";

export default function FileUpload({
  accept = DEFAULT_ACCEPT,
  maxSizeMb = 50,
  maxFiles = 10,
  label = "Upload files",
  onFiles,
}: FileUploadProps) {
  const [staged, setStaged] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = (files: FileList | null): File[] => {
    if (!files) return [];
    setError(null);
    const valid: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (valid.length >= maxFiles) {
        setError(`Maximum ${maxFiles} files allowed.`);
        break;
      }

      if (file.size > maxSizeMb * 1024 * 1024) {
        setError(`"${file.name}" exceeds ${maxSizeMb}MB limit.`);
        continue;
      }

      valid.push(file);
    }

    return valid;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const valid = validate(e.dataTransfer.files);
    if (valid.length > 0) {
      setStaged((prev) => {
        const combined = [...prev, ...valid].slice(0, maxFiles);
        return combined;
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valid = validate(e.target.files);
    if (valid.length > 0) {
      setStaged((prev) => {
        const combined = [...prev, ...valid].slice(0, maxFiles);
        return combined;
      });
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setStaged((prev) => prev.filter((_, i) => i !== index));
  };

  const confirmUpload = () => {
    if (staged.length === 0) return;
    onFiles(staged);
    setStaged([]);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="
          flex cursor-pointer flex-col items-center justify-center
          rounded-lg border-2 border-dashed
          border-(--border-primary-dashboard)
          bg-(--bg-primary-dashboard)/50
          p-6
          transition
          hover:border-(--secondary-text-dashboard)
          hover:bg-(--secondary-bg-dashboard)/10
        "
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        aria-label={label}
      >
        <Upload className="mb-2 text-(--tertiary-text-dashboard)" size={24} />
        <p className="text-sm font-medium text-(--text-primary-dashboard)">
          {label}
        </p>
        <p className="mt-1 text-xs text-(--tertiary-text-dashboard)">
          Drag &amp; drop or click to browse. Max {maxSizeMb}MB per file.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={maxFiles > 1}
        onChange={handleChange}
        className="hidden"
        aria-hidden="true"
      />

      {error && (
        <p className="text-sm text-(--danger-dashboard)" role="alert">
          {error}
        </p>
      )}

      {staged.length > 0 && (
        <div className="space-y-2">
          {staged.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="flex items-center justify-between rounded-lg border border-(--border-primary-dashboard) bg-white px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-(--tertiary-text-dashboard)" />
                <span className="text-sm text-(--text-primary-dashboard)">
                  {file.name}
                </span>
                <span className="text-xs text-(--tertiary-text-dashboard)">
                  ({formatSize(file.size)})
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-(--tertiary-text-dashboard) hover:text-(--danger-dashboard)"
                aria-label={`Remove ${file.name}`}
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={confirmUpload}
            className="
              rounded-lg bg-(--secondary-text-dashboard) px-4 py-2
              text-sm font-medium text-white transition
              hover:bg-(--secondary-text-dashboard)/90
              hover:cursor-pointer
            "
          >
            Upload {staged.length} file{staged.length > 1 ? "s" : ""}
          </button>
        </div>
      )}
    </div>
  );
}
