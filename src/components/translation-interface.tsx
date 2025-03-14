"use client";

import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Image,
  Languages,
  Copy,
  Volume2,
  Mic,
  RotateCcw,
  X,
  FileText as Document,
  Star,
  Share2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "zh", name: "Chinese (Simplified)" },
  { code: "zh-TW", name: "Chinese (Traditional)" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "vi", name: "Vietnamese" },
  { code: "th", name: "Thai" },
  { code: "id", name: "Indonesian" },
];

const languageGroups = [
  { name: "Recently Used", languages: ["en", "es", "fr"] },
  { name: "All Languages", languages: languages.map((lang) => lang.code) },
];

export default function TranslationInterface({ isPremium = false }) {
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [activeTab, setActiveTab] = useState("text");
  const [showSourceLanguageDropdown, setShowSourceLanguageDropdown] =
    useState(false);
  const [showTargetLanguageDropdown, setShowTargetLanguageDropdown] =
    useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [savedTranslations, setSavedTranslations] = useState([]);

  const sourceTextareaRef = useRef(null);
  const targetTextareaRef = useRef(null);

  // Simulate translation (in a real app, this would call an API)
  const handleTranslate = () => {
    if (!sourceText.trim()) {
      setTranslatedText("");
      return;
    }

    // This is just a placeholder - in a real app you would call a translation API
    const sourceLang =
      languages.find((l) => l.code === sourceLanguage)?.name || sourceLanguage;
    const targetLang =
      languages.find((l) => l.code === targetLanguage)?.name || targetLanguage;

    // Simple simulation of translation
    let translated = "";
    if (sourceLanguage === "en" && targetLanguage === "es") {
      if (sourceText.toLowerCase().includes("hello")) {
        translated = "Hola";
      } else if (sourceText.toLowerCase().includes("goodbye")) {
        translated = "Adiós";
      } else if (sourceText.toLowerCase().includes("thank you")) {
        translated = "Gracias";
      } else {
        translated = `[Translated from ${sourceLang} to ${targetLang}]: ${sourceText}`;
      }
    } else {
      translated = `[Translated from ${sourceLang} to ${targetLang}]: ${sourceText}`;
    }

    setTranslatedText(translated);
  };

  // Update character count when source text changes
  useEffect(() => {
    setCharacterCount(sourceText.length);
    handleTranslate();
  }, [sourceText, sourceLanguage, targetLanguage]);

  const handleSwapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleCopyTranslation = () => {
    navigator.clipboard.writeText(translatedText);
    // In a real app, you would show a toast notification here
  };

  const handleClearText = () => {
    setSourceText("");
    setTranslatedText("");
    if (sourceTextareaRef.current) {
      sourceTextareaRef.current.focus();
    }
  };

  const handleSaveTranslation = () => {
    if (sourceText && translatedText) {
      const newSavedTranslation = {
        id: Date.now(),
        sourceLanguage,
        targetLanguage,
        sourceText,
        translatedText,
        timestamp: new Date().toISOString(),
      };

      setSavedTranslations([...savedTranslations, newSavedTranslation]);
      // In a real app, you would save this to a database
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-sm border">
      <Tabs
        defaultValue="text"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-2">
          <TabsTrigger value="text" className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            <span>Text</span>
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            <span>Image</span>
          </TabsTrigger>
          <TabsTrigger value="document" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Document</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Source Text */}
            <div className="border-r relative">
              {/* Source Language Selector */}
              <div className="p-3 border-b flex justify-between items-center h-14">
                <div className="relative">
                  <button
                    className="flex items-center gap-1 text-sm font-medium"
                    onClick={() =>
                      setShowSourceLanguageDropdown(!showSourceLanguageDropdown)
                    }
                  >
                    {languages.find((l) => l.code === sourceLanguage)?.name ||
                      "Source Language"}
                    <span
                      className={`transition-transform ${showSourceLanguageDropdown ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </button>

                  {showSourceLanguageDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg z-50 w-64 max-h-96 overflow-y-auto">
                      {languageGroups.map((group) => (
                        <div key={group.name} className="p-2">
                          <div className="text-xs text-gray-500 mb-1">
                            {group.name}
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            {group.languages.map((langCode) => {
                              const lang = languages.find(
                                (l) => l.code === langCode,
                              );
                              if (!lang) return null;
                              return (
                                <button
                                  key={lang.code}
                                  className={`text-left px-3 py-2 text-sm rounded-md ${sourceLanguage === lang.code ? "bg-green-100 text-green-700" : "hover:bg-gray-100"}`}
                                  onClick={() => {
                                    setSourceLanguage(lang.code);
                                    setShowSourceLanguageDropdown(false);
                                  }}
                                >
                                  {lang.name}
                                  {sourceLanguage === lang.code && (
                                    <span className="ml-1 text-green-600">
                                      ✓
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSwapLanguages}
                  className="h-8 w-8"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* Source Text Area */}
              <div className="relative">
                {sourceText && (
                  <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
                    onClick={handleClearText}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <textarea
                  ref={sourceTextareaRef}
                  placeholder="Enter text to translate"
                  className="w-full p-4 min-h-[300px] resize-none border-0 focus:ring-0 focus:outline-none"
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                />

                {/* Character count and action buttons */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    {characterCount} / 3000
                  </div>

                  {sourceText && (
                    <div className="flex gap-2">
                      <button className="text-gray-500 hover:text-gray-700">
                        <Volume2 className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Document className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Translated Text */}
            <div className="relative">
              {/* Target Language Selector */}
              <div className="p-3 border-b flex justify-between items-center h-14">
                <div className="relative">
                  <button
                    className="flex items-center gap-1 text-sm font-medium"
                    onClick={() =>
                      setShowTargetLanguageDropdown(!showTargetLanguageDropdown)
                    }
                  >
                    {languages.find((l) => l.code === targetLanguage)?.name ||
                      "Target Language"}
                    <span
                      className={`transition-transform ${showTargetLanguageDropdown ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </button>

                  {showTargetLanguageDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg z-50 w-64 max-h-96 overflow-y-auto">
                      {languageGroups.map((group) => (
                        <div key={group.name} className="p-2">
                          <div className="text-xs text-gray-500 mb-1">
                            {group.name}
                          </div>
                          <div className="grid grid-cols-2 gap-1">
                            {group.languages.map((langCode) => {
                              const lang = languages.find(
                                (l) => l.code === langCode,
                              );
                              if (!lang) return null;
                              return (
                                <button
                                  key={lang.code}
                                  className={`text-left px-3 py-2 text-sm rounded-md ${targetLanguage === lang.code ? "bg-green-100 text-green-700" : "hover:bg-gray-100"}`}
                                  onClick={() => {
                                    setTargetLanguage(lang.code);
                                    setShowTargetLanguageDropdown(false);
                                  }}
                                >
                                  {lang.name}
                                  {targetLanguage === lang.code && (
                                    <span className="ml-1 text-green-600">
                                      ✓
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">Auto</span>
                  <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow"></div>
                  </div>
                </div>
              </div>

              {/* Target Text Area */}
              <div className="relative">
                <textarea
                  ref={targetTextareaRef}
                  readOnly
                  placeholder="Translation will appear here"
                  className="w-full p-4 min-h-[300px] resize-none border-0 focus:ring-0 focus:outline-none bg-white"
                  value={translatedText}
                />

                {/* Action buttons */}
                {translatedText && (
                  <div className="absolute bottom-3 right-3 flex gap-3">
                    <button className="text-gray-500 hover:text-gray-700">
                      <Volume2 className="h-5 w-5" />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={handleCopyTranslation}
                    >
                      <Document className="h-5 w-5" />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={handleSaveTranslation}
                    >
                      <Star className="h-5 w-5" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="image" className="mt-0">
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <Image className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Upload an image for translation
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Supported formats: JPG, PNG, GIF
            </p>
            <Button>Upload Image</Button>
            {!isPremium && (
              <p className="text-xs text-amber-600 mt-4">
                Upgrade to Pro for advanced OCR translation features
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="document" className="mt-0">
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Upload a document for translation
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Supported formats: PDF, DOCX, TXT
            </p>
            <Button>Upload Document</Button>
            {!isPremium && (
              <p className="text-xs text-amber-600 mt-4">
                Free tier limited to 1MB documents. Upgrade for larger files.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
