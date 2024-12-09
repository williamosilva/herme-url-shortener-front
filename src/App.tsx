import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Link2, Github, Linkedin, Globe } from "lucide-react";

const UrlShortenerHero = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShorten = () => {
    // Aqui você implementaria a lógica real de encurtamento de URL
    // Por enquanto, vou simular
    const fakeShortUrl = `https://short.url/${Math.random()
      .toString(36)
      .substring(7)}`;
    setShortenedUrl(fakeShortUrl);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white w-screen">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Herme URL Shortener
        </h1>

        <div className="w-full max-w-xl space-y-4">
          <div className="flex space-x-2">
            <Input
              type="url"
              placeholder="Cole sua URL aqui"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="flex-grow text-gray-900"
            />
            <Button onClick={handleShorten} disabled={!originalUrl}>
              Encurtar
            </Button>
          </div>

          {shortenedUrl && (
            <div className="flex space-x-2">
              <Input value={shortenedUrl} readOnly className="flex-grow" />
              <Button variant="outline" onClick={handleCopy}>
                {copied ? "Copiado!" : <Copy />}
              </Button>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto flex justify-center space-x-8">
          <a
            href="https://github.com/seuperfil"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href="https://seusite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
          >
            <Globe size={24} />
          </a>
          <a
            href="https://linkedin.com/in/seuperfil"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default UrlShortenerHero;
