import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Languages, FileText, Image } from "lucide-react";

export default async function TranslationHistory() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // In a real app, you would fetch translation history from the database
  // This is just placeholder data
  const mockHistory = [
    {
      id: 1,
      type: "text",
      sourceLanguage: "English",
      targetLanguage: "Spanish",
      sourceText: "Hello world",
      translatedText: "Hola mundo",
      date: "2023-06-15T10:30:00Z",
    },
    {
      id: 2,
      type: "document",
      sourceLanguage: "English",
      targetLanguage: "French",
      fileName: "business_report.pdf",
      date: "2023-06-14T14:45:00Z",
    },
    {
      id: 3,
      type: "image",
      sourceLanguage: "Japanese",
      targetLanguage: "English",
      fileName: "menu.jpg",
      date: "2023-06-13T09:15:00Z",
    },
    {
      id: 4,
      type: "text",
      sourceLanguage: "German",
      targetLanguage: "English",
      sourceText: "Wie geht es dir?",
      translatedText: "How are you?",
      date: "2023-06-12T16:20:00Z",
    },
  ];

  // Function to get the appropriate icon based on translation type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <Languages className="h-5 w-5 text-blue-500" />;
      case "document":
        return <FileText className="h-5 w-5 text-green-500" />;
      case "image":
        return <Image className="h-5 w-5 text-purple-500" />;
      default:
        return <Languages className="h-5 w-5 text-blue-500" />;
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="h-6 w-6 text-blue-600" />
              <h1 className="text-3xl font-bold">Translation History</h1>
            </div>
          </header>

          {/* History List */}
          <div className="grid gap-4">
            {mockHistory.length > 0 ? (
              mockHistory.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <CardTitle className="text-lg capitalize">
                          {item.type} Translation
                        </CardTitle>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          {item.sourceLanguage} → {item.targetLanguage}
                        </span>
                        {item.fileName && (
                          <span className="font-medium">{item.fileName}</span>
                        )}
                      </div>
                      {item.sourceText && (
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-sm font-medium mb-1">Source:</p>
                            <p className="text-sm">{item.sourceText}</p>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-md">
                            <p className="text-sm font-medium mb-1">
                              Translation:
                            </p>
                            <p className="text-sm">{item.translatedText}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <History className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No translation history yet
                </h3>
                <p className="text-sm text-gray-500">
                  Your translation history will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
