import { useEffect, useState } from 'react';
import { Plus, Search, Phone, Video, MoreVertical, Paperclip, Smile, Send } from 'lucide-react';
import { api } from '../api/client';

export default function Chat() {
  const [tab, setTab] = useState('Personal');
  const [active, setActive] = useState(2);
  const [chatList, setChatList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [draft, setDraft] = useState('');

  useEffect(() => {
    Promise.all([api.get('/chatContacts'), api.get('/chatMessages')])
      .then(([contacts, msgs]) => {
        setChatList(contacts);
        setMessages(msgs);
      })
      .catch(() => setError('Could not reach JSON Server. Run "npm run server" on port 4000.'))
      .finally(() => setLoading(false));
  }, []);

  const send = async () => {
    if (!draft.trim()) return;
    const newMessage = { conversationId: 3, fromMe: true, text: draft, time: 'Now' };
    setMessages((m) => [...m, newMessage]);
    setDraft('');
    try {
      await api.post('/chatMessages', newMessage);
    } catch {
      // best-effort; message already shown locally
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-400 py-16 text-center">Loading conversations…</p>;
  }
  if (error) {
    return <p className="text-sm text-rose-500 py-16 text-center">{error}</p>;
  }

  const activeContact = chatList[active];
  const fallbackAvatar = chatList[2]?.img;

  return (
    <div className="h-[calc(100vh-8rem)] min-h-[560px]">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] h-full rounded-2xl overflow-hidden shadow-card bg-white">
        {/* Message list */}
        <div className={`border-r border-gray-100 flex flex-col ${active !== null ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-5 pb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Message</h2>
            <button className="w-9 h-9 rounded-full bg-primary-500 text-white flex items-center justify-center">
              <Plus size={18} />
            </button>
          </div>
          <div className="px-5 mb-3">
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input placeholder="Search" className="w-full bg-gray-50 rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-6 px-5 border-b border-gray-100 pb-3 mb-2">
            {['All', 'Personal', 'Teams'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-sm font-medium pb-1 ${tab === t ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-400'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto">
            {chatList.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 w-full text-left px-5 py-3.5 transition ${active === i ? 'bg-primary-50' : 'hover:bg-gray-50'}`}
              >
                <div className="relative shrink-0">
                  <img src={c.img} className="w-11 h-11 rounded-full object-cover" alt="" />
                  {c.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-800 truncate">{c.name}</p>
                    <span className="text-[10px] text-gray-400 shrink-0">{c.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{c.preview}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation */}
        <div className={`flex flex-col ${active === null ? 'hidden md:flex' : 'flex'}`}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <button className="md:hidden text-gray-400" onClick={() => setActive(null)}>←</button>
              <img src={activeContact?.img || fallbackAvatar} className="w-10 h-10 rounded-full object-cover" alt="" />
              <div>
                <p className="text-sm font-semibold text-gray-800">{activeContact?.name || 'Select a conversation'}</p>
                <p className="text-xs text-emerald-500">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center"><Phone size={16} /></button>
              <button className="w-9 h-9 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center"><Video size={16} /></button>
              <button className="w-9 h-9 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center"><MoreVertical size={16} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.fromMe ? 'justify-end' : 'justify-start'}`}>
                <div className="flex items-end gap-2 max-w-[80%] sm:max-w-[65%]">
                  {!m.fromMe && !m.images && <img src={fallbackAvatar} className="w-7 h-7 rounded-full object-cover" alt="" />}
                  <div>
                    {m.images ? (
                      <div className="flex gap-2">
                        {m.images.map((image, imageIndex) => (
                          <img
                            key={image}
                            src={image}
                            alt={`Shared image ${imageIndex + 1}`}
                            className="w-28 h-24 rounded-xl object-cover"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className={`rounded-2xl px-4 py-2.5 text-sm ${m.fromMe ? 'bg-primary-500 text-white rounded-br-sm' : 'bg-gray-100 text-gray-700 rounded-bl-sm'}`}>
                        {m.text}
                      </div>
                    )}
                    {m.time && <p className={`text-[10px] text-gray-400 mt-1 ${m.fromMe ? 'text-right' : ''}`}>{m.time}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 sm:p-5 border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-2.5">
              <Paperclip size={18} className="text-gray-400 shrink-0" />
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-sm focus:outline-none min-w-0"
              />
              <Smile size={18} className="text-gray-400 shrink-0" />
              <button onClick={send} className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center shrink-0">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
