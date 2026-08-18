import { useState } from "react";
import { FiCheck, FiFacebook, FiLink, FiLinkedin, FiTwitter } from "react-icons/fi";

export default function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const links = [
    {
      label: "Twitter",
      icon: <FiTwitter size={16} />,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "LinkedIn",
      icon: <FiLinkedin size={16} />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "Facebook",
      icon: <FiFacebook size={16} />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <div className="share-buttons">
      {links.map((link) => (
        <a
          key={link.label}
          className="icon-btn"
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Share on ${link.label}`}
          title={`Share on ${link.label}`}
        >
          {link.icon}
        </a>
      ))}
      <button
        className="icon-btn"
        onClick={handleCopy}
        aria-label="Copy link"
        title="Copy link"
      >
        {copied ? <FiCheck size={16} /> : <FiLink size={16} />}
      </button>
    </div>
  );
}
