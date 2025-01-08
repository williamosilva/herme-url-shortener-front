import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

import { Copy, Github, Linkedin, Sun, Moon, Globe } from "lucide-react";

const UrlShortenerHero = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL;

  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  const handleShorten = async () => {
    setShortenedUrl("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${apiUrl}/url`,
        { url: originalUrl },
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );

      const shortCode = response.data.id;
      const constructedShortUrl = `${apiUrl}/${shortCode}`;
      setShortenedUrl(constructedShortUrl);
    } catch (err) {
      console.error("URL shortening error:", err);

      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to shorten URL");
      } else if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const SocialIcons = () => {
    const socialLinks = [
      {
        icon: Github,
        link: "https://github.com/williamosilva",
        label: "GitHub",
      },
      {
        icon: Globe,
        link: "https://williamsilva.dev/",
        label: "Blog",
      },
      {
        icon: Linkedin,
        link: "https://www.linkedin.com/in/williamsilva2005/",
        label: "LinkedIn",
      },
    ];

    return (
      <div className="flex items-center space-x-4">
        {socialLinks.map(({ icon: Icon, link, label }) => (
          <a
            key={link}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`relative group transition-all duration-300 ${
              isDarkTheme
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-black"
            }`}
          >
            <Icon
              size={20}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span className="absolute bottom-[32px] left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {label}
            </span>
          </a>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between w-screen relative overflow-hidden transition-colors duration-300 ${
        isDarkTheme
          ? "bg-gradient-to-br from-gray-900 to-black text-white"
          : "bg-gradient-to-br from-gray-100 to-white text-black"
      }`}
    >
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center space-y-8 relative">
        <div
          className={`absolute inset-0 pointer-events-none opacity-10 ${
            isDarkTheme ? "bg-grid-white/[0.03]" : "bg-grid-black/[0.03]"
          } [mask-image:linear-gradient(0deg,rgba(255,255,255,0),rgba(255,255,255,0.2))]`}
        >
          {/* Background Grid */}
        </div>

        <h1
          className={`text-4xl md:text-6xl font-extralight tracking-tight text-transparent bg-clip-text ${
            isDarkTheme
              ? "bg-gradient-to-r from-white via-gray-300 to-white"
              : "bg-gradient-to-r from-black via-gray-700 to-black"
          }`}
        >
          Herme URL Shortener
        </h1>

        <div className="w-full max-w-xl space-y-4 z-10">
          <div className="flex space-x-2">
            <Input
              type="url"
              placeholder="Cole sua URL aqui"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className={`flex-grow transition-all duration-300 ${
                isDarkTheme
                  ? "bg-gray-800 border-none text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                  : "bg-gray-100 border-gray-300 text-black placeholder-gray-600 focus:ring-2 focus:ring-blue-500"
              }`}
            />
            <Button
              onClick={handleShorten}
              disabled={!originalUrl || isLoading}
              className={`transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-transparent ${
                isDarkTheme
                  ? "bg-blue-600 hover:bg-blue-500 text-white"
                  : "bg-blue-700 hover:bg-blue-600 text-white"
              }`}
            >
              Encurtar
            </Button>
          </div>

          {shortenedUrl && (
            <div className="flex space-x-2 animate-fade-in">
              <Input
                value={shortenedUrl}
                readOnly
                className={`flex-grow transition-all duration-300 ${
                  isDarkTheme
                    ? "bg-gray-800 border-none text-white"
                    : "bg-gray-100 border-gray-300 text-black"
                }`}
              />
              <Button
                variant="outline"
                onClick={handleCopy}
                className={`transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-transparent ${
                  isDarkTheme
                    ? "bg-transparent border-blue-600 text-blue-400 hover:bg-blue-600/10"
                    : "bg-transparent border-blue-700 text-blue-700 hover:bg-blue-700/10"
                }`}
              >
                {copied ? (
                  <p
                    className={isDarkTheme ? "text-blue-400" : "text-blue-700"}
                  >
                    Copiado!
                  </p>
                ) : (
                  <Copy
                    className={isDarkTheme ? "text-blue-400" : "text-blue-700"}
                  />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      <footer
        className={`${
          isDarkTheme
            ? "bg-gray-900/30 backdrop-blur-sm border-t border-gray-800/50"
            : "bg-gray-100/30 backdrop-blur-sm border-t border-gray-200/50"
        } py-4 px-6 flex items-center justify-between`}
      >
        <div className="text-sm opacity-70">
          © {new Date().getFullYear()} Herme URL Shortener
        </div>

        <div className="flex items-center space-x-4">
          <SocialIcons />

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`p-2 rounded-full transition-all duration-300 bg-transparent border-none hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-transparent ${
              isDarkTheme
                ? "text-white hover:bg-white/20"
                : "text-black hover:bg-black/20"
            }`}
          >
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default UrlShortenerHero;
