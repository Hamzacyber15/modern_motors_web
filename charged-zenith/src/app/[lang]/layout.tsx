import BackgroundEffects from "@/components/BackgroundEffects";
import { MessageCircle } from "lucide-react";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div lang={lang} dir={dir}>
      <BackgroundEffects />
      {children}
      
      {/* Global Adaptive WhatsApp Button - Avoiding Sidebar Overlap */}
      <a 
        href="https://wa.me/96812345678" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`fixed bottom-10 ${lang === 'ar' ? 'right-10' : 'left-10'} z-[150] w-16 h-16 md:w-20 md:h-20 bg-primary text-brand-secondary rounded-full flex items-center justify-center shadow-[0_0_30px_var(--primary-glow)] hover:scale-110 transition-all duration-300 group`}
      >
        <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-[var(--background)]/90 backdrop-blur-md border border-[var(--primary)]/20 rounded-xl text-[10px] font-black text-primary tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          WHATSAPP_SUPPORT
        </span>
      </a>
    </div>
  );
}
