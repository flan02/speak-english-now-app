import { Github, Globe, Linkedin } from "lucide-react";

export function LinkedInButton() {
  return (
    <a
      href="https://www.linkedin.com/in/dan-chanivet-574084b2/"
      target="_blank"
      rel="noopener noreferrer"
      className="min-w-[300px] lg:w-full inline-flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-[#0A66C2] text-white hover:bg-[#19548f] transition-colors duration-300 shadow-md"
    >
      <Linkedin className="w-5 h-5" />
      <span className="text-sm lg:text-lg mt-1 font-bold">LinkedIn</span>
    </a>
  );
}

export function GitHubButton() {
  return (
    <a
      href="https://github.com/flan02" // 🔗 reemplaza con tu perfil
      target="_blank"
      rel="noopener noreferrer"
      className="min-w-[300px] lg:w-full inline-flex items-center justify-center gap-2 px-6 py-2 border rounded-xl bg-[#111] text-white hover:bg-black transition-colors duration-300 shadow-md"
    >
      <Github className="w-5 h-5 -ml-4" />
      <span className="text-sm lg:text-lg mt-1 font-bold">GitHub</span>
    </a>
  );
}

export function MyWebsiteButton() {
  const MY_WEBSITE = process.env.PERSONAL_WEBSITE!
  return (
    <a
      href={MY_WEBSITE}
      target="_blank"
      className="min-w-[300px] lg:w-full relative inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-semibold shadow-lg overflow-hidden transition-all duration-300
                 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500"
    >
      <Globe className="w-5 h-5 ml-5" />
      <span className="relative z-10 text-sm lg:text-lg ml-2">Mi Website</span>
    </a>
  );
}