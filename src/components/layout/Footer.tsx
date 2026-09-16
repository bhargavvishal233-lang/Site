export const Footer = () => {
  return (
    <footer className="bg-white border-t border-black/5 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center text-charcoal-muted text-sm">
        &copy; {new Date().getFullYear()} Spectrum Agency. All rights reserved.
      </div>
    </footer>
  );
};
