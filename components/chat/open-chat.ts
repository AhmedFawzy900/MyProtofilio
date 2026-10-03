export const OPEN_CHAT_EVENT = "portfolio:open-chat";

export function openChat(question?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail: { question } }));
}
