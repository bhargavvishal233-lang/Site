import re

with open("src/app/services/ui-ux-design/page.tsx", "r") as f:
    content = f.read()

# Change <main> to <div> since layout.tsx already has a <main>
content = content.replace('<main className="min-h-screen', '<div className="min-h-screen -mt-24')
content = content.replace('</main>', '</div>')

slider_section = """
      {/* Featured Service / Media Section (The missing upper part) */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pb-24">
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-sm overflow-hidden bg-white/5 mb-8">
          <video 
            src="/ui-ux-design-static/media/44061-720.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex items-center gap-4 text-gray-400 font-mono text-sm">
            <span>01</span>
            <span className="w-8 h-px bg-gray-700"></span>
            <span>04</span>
          </div>
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Brand Identity</h2>
            <p className="text-xl md:text-2xl text-gray-400 font-serif leading-snug">
              We believe a brand identity is a body of work, not just a logo.
            </p>
          </div>
        </div>
      </section>
"""

# Insert the slider section right after the Hero Section
content = content.replace('      {/* Manifesto Section */}', slider_section + '\n      {/* Manifesto Section */}')

with open("src/app/services/ui-ux-design/page.tsx", "w") as f:
    f.write(content)
