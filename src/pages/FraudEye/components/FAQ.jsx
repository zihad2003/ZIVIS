import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "How does the graph-based detection work?",
    a: "We model accounts as nodes and transactions as edges. Our algorithms scan for specific topologies like cycles (money loops) and fan-in/fan-out patterns common in money laundering bhai."
  },
  {
    q: "Is my data stored on the server?",
    a: "We use MongoDB to store transaction records if you choose to persist them, but analysis is performed in real-time. Your CSV data is processed securely bhai."
  },
  {
    q: "What is a 'Suspicion Score'?",
    a: "It's a value from 0-100 calculated based on how many fraudulent patterns an account participates in. Higher scores indicate higher risk flags."
  },
  {
    q: "Can I customize the detection rules?",
    a: "Currently, rules are pre-configured for AML (Anti-Money Laundering) best practices, including cycle lengths and smurfing thresholds."
  }
];

const FAQ = () => {
  const [active, setActive] = useState(null);

  return (
    <section style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{ fontSize: '40px', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '12px' }}>
          Questions? <span style={{ color: 'var(--primary)' }}>Clarified.</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Protocol FAQ
        </p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className="apple-card"
            style={{ 
              padding: '0', 
              overflow: 'hidden',
              transition: 'background 0.3s ease',
              backgroundColor: active === i ? 'rgba(0,0,0,0.01)' : 'var(--card)'
            }}
          >
            <button
              onClick={() => setActive(active === i ? null : i)}
              style={{ 
                width: '100%', 
                padding: '24px', 
                background: 'none', 
                border: 'none', 
                textAlign: 'left', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <span style={{ 
                fontSize: '17px', 
                fontWeight: '600', 
                color: active === i ? 'var(--primary)' : 'var(--text)',
                transition: 'color 0.3s ease'
              }}>
                {faq.q}
              </span>
              <div style={{ 
                color: active === i ? 'var(--primary)' : 'var(--text-secondary)',
                transition: 'transform 0.3s ease',
                transform: active === i ? 'rotate(180deg)' : 'rotate(0deg)'
              }}>
                {active === i ? <Minus size={18} /> : <Plus size={18} />}
              </div>
            </button>
            <AnimatePresence>
              {active === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div style={{ 
                    padding: '0 24px 24px 24px', 
                    color: 'var(--text-secondary)', 
                    fontSize: '15px', 
                    lineHeight: '1.5',
                    fontWeight: '400'
                  }}>
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
