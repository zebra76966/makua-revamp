import useAsync from "../../hooks/useAsync";
import { siteAPI } from "../../services/api";

/**
 * The site's own details — name, contact, social links, legal links.
 *
 * All of it is editable from the admin's Settings screen, so Shane can add
 * Makua's Instagram without anyone touching the code. Until something is
 * filled in, the link simply isn't rendered: a footer with two real links
 * is better than one with five that go to a stranger's homepage.
 */
export default function useSite() {
  const { data } = useAsync(() => siteAPI.get(), [], null);
  return data || null;
}

/** [{ key, label, href }] for whatever has actually been filled in. */
export const socialLinks = (site) => {
  const s = site?.social || {};
  return [
    { key: "instagram", label: "INSTAGRAM", href: s.instagram },
    { key: "facebook", label: "FACEBOOK", href: s.facebook },
    { key: "linkedin", label: "LINKEDIN", href: s.linkedin },
    { key: "discord", label: "DISCORD", href: s.discord },
  ].filter((l) => l.href);
};
