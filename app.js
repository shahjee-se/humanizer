// ===================================
// APP.JS - Text Humanizer Application
// ===================================

(function() {
  'use strict';

  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', init);

  // Configuration and data
  const MODES = {
    chat: { burst: 0.80, syn: 0.20, trans: 0.35, punct: 0.60, name: 'Casual' },
    pro: { burst: 0.55, syn: 0.12, trans: 0.15, punct: 0.70, name: 'Business' },
    academic: { burst: 0.45, syn: 0.25, trans: 0.10, punct: 0.75, name: 'School' }
  };

  const WORD_MAPS = {
    chat: {
      utilize: 'use', commence: 'start', subsequently: 'later', therefore: 'so',
      nevertheless: 'still', demonstrate: 'show', endeavor: 'try', facilitate: 'help',
      implement: 'set up', furthermore: 'also', 'in conclusion': 'anyway',
      additionally: 'plus', consequently: 'so', moreover: 'also',
      thus: 'so', hence: 'so', regarding: 'about', concerning: 'about'
    },
    pro: {
      utilize: 'use', commence: 'begin', subsequently: 'afterwards', therefore: 'thus',
      nevertheless: 'however', demonstrate: 'illustrate', endeavor: 'attempt',
      facilitate: 'enable', implement: 'deploy', furthermore: 'moreover',
      'in conclusion': 'to wrap up', additionally: 'furthermore', consequently: 'as a result',
      moreover: 'additionally', thus: 'therefore', hence: 'consequently',
      regarding: 'with respect to', concerning: 'pertaining to'
    },
    academic: {
      utilize: 'employ', commence: 'initiate', subsequently: 'following', therefore: 'hence',
      nevertheless: 'nonetheless', demonstrate: 'evidence', endeavor: 'strive',
      facilitate: 'promote', implement: 'integrate', furthermore: 'in addition',
      'in conclusion': 'in summary', additionally: 'furthermore', consequently: 'accordingly',
      moreover: 'furthermore', thus: 'hence', hence: 'therefore',
      regarding: 'pertaining to', concerning: 'relating to'
    }
  };

  // State
  let config = {
    burst: 0.80,
    syn: 0.20,
    trans: 0.35,
    punct: 0.60,
    tone: 'chat'
  };

  let history = [];

  // DOM Elements
  const elements = {};

  // Initialize the application
  function init() {
    cacheElements();
    loadHistory();
    bindEvents();
    updateStats();
    console.log('✅ App initialized - all buttons should be clickable now!');
  }

  // Cache DOM elements
  function cacheElements() {
    elements.input = document.getElementById('input');
    elements.output = document.getElementById('output');
    elements.humanizeBtn = document.getElementById('humanizeBtn');
    elements.copyBtn = document.getElementById('copyBtn');
    elements.downloadBtn = document.getElementById('downloadBtn');
    elements.clearBtn = document.getElementById('clearBtn');
    elements.themeToggle = document.getElementById('themeToggle');
    elements.historyBtn = document.getElementById('historyBtn');
    elements.historyDropdown = document.getElementById('historyDropdown');
    elements.historyList = document.getElementById('historyList');
    elements.clearHistoryBtn = document.getElementById('clearHistoryBtn');
    elements.toast = document.getElementById('toast');
    elements.wordCount = document.getElementById('wordCount');
    elements.lineCount = document.getElementById('lineCount');
    elements.modeDisplay = document.getElementById('modeDisplay');
    elements.readinessMeter = document.getElementById('readinessMeter');
    
    // Sliders
    elements.burst = document.getElementById('burst');
    elements.syn = document.getElementById('syn');
    elements.trans = document.getElementById('trans');
    elements.punct = document.getElementById('punct');
    
    // Slider value displays
    elements.burstVal = document.getElementById('burstVal');
    elements.synVal = document.getElementById('synVal');
    elements.transVal = document.getElementById('transVal');
    elements.punctVal = document.getElementById('punctVal');
  }

  // Bind all event listeners
  function bindEvents() {
    // Mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', handleModeClick);
    });

    // Sliders
    if (elements.burst) elements.burst.addEventListener('input', handleBurstChange);
    if (elements.syn) elements.syn.addEventListener('input', handleSynChange);
    if (elements.trans) elements.trans.addEventListener('input', handleTransChange);
    if (elements.punct) elements.punct.addEventListener('input', handlePunctChange);

    // Action buttons
    if (elements.humanizeBtn) elements.humanizeBtn.addEventListener('click', handleHumanize);
    if (elements.copyBtn) elements.copyBtn.addEventListener('click', handleCopy);
    if (elements.downloadBtn) elements.downloadBtn.addEventListener('click', handleDownload);
    if (elements.clearBtn) elements.clearBtn.addEventListener('click', handleClear);
    
    // Header buttons
    if (elements.themeToggle) elements.themeToggle.addEventListener('click', handleThemeToggle);
    if (elements.historyBtn) elements.historyBtn.addEventListener('click', handleHistoryToggle);
    if (elements.clearHistoryBtn) elements.clearHistoryBtn.addEventListener('click', handleClearHistory);

    // Input changes
    if (elements.input) elements.input.addEventListener('input', updateStats);

    // Close dropdown when clicking outside
    document.addEventListener('click', handleOutsideClick);
  }

  // Handle mode button clicks
  function handleModeClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const mode = this.dataset.mode;
    if (!mode) return;

    // Update active state
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');

    // Update config
    config.tone = mode;
    const modeData = MODES[mode];
    
    // Update sliders
    config.burst = modeData.burst;
    config.syn = modeData.syn;
    config.trans = modeData.trans;
    config.punct = modeData.punct;

    if (elements.burst) elements.burst.value = modeData.burst;
    if (elements.syn) elements.syn.value = modeData.syn;
    if (elements.trans) elements.trans.value = modeData.trans;
    if (elements.punct) elements.punct.value = modeData.punct;

    if (elements.burstVal) elements.burstVal.textContent = modeData.burst.toFixed(2);
    if (elements.synVal) elements.synVal.textContent = modeData.syn.toFixed(2);
    if (elements.transVal) elements.transVal.textContent = modeData.trans.toFixed(2);
    if (elements.punctVal) elements.punctVal.textContent = modeData.punct.toFixed(2);

    showToast(`✓ Mode changed to ${modeData.name}`);
    updateStats();
  }

  // Slider handlers
  function handleBurstChange() {
    config.burst = parseFloat(this.value);
    if (elements.burstVal) elements.burstVal.textContent = config.burst.toFixed(2);
  }

  function handleSynChange() {
    config.syn = parseFloat(this.value);
    if (elements.synVal) elements.synVal.textContent = config.syn.toFixed(2);
  }

  function handleTransChange() {
    config.trans = parseFloat(this.value);
    if (elements.transVal) elements.transVal.textContent = config.trans.toFixed(2);
  }

  function handlePunctChange() {
    config.punct = parseFloat(this.value);
    if (elements.punctVal) elements.punctVal.textContent = config.punct.toFixed(2);
  }

  // Humanize button handler
  function handleHumanize(e) {
    e.preventDefault();
    e.stopPropagation();

    const inputText = elements.input ? elements.input.value.trim() : '';
    
    if (!inputText) {
      showToast('⚠️ Please enter some text first!', 'error');
      return;
    }

    // Show loading state
    const originalText = elements.humanizeBtn.querySelector('.btn-text').textContent;
    elements.humanizeBtn.querySelector('.btn-text').innerHTML = '<span class="spinner"></span> Processing...';
    elements.humanizeBtn.disabled = true;

    // Simulate processing delay
    setTimeout(() => {
      const humanized = humanizeText(inputText);
      if (elements.output) elements.output.value = humanized;
      
      // Add to history
      addToHistory(humanized);
      
      // Reset button
      elements.humanizeBtn.querySelector('.btn-text').textContent = originalText;
      elements.humanizeBtn.disabled = false;
      
      showToast('✓ Text humanized successfully!');
      updateStats();
    }, 800);
  }

  // Copy button handler
  function handleCopy(e) {
    e.preventDefault();
    e.stopPropagation();

    const outputText = elements.output ? elements.output.value.trim() : '';
    
    if (!outputText) {
      showToast('⚠️ Nothing to copy!', 'error');
      return;
    }

    navigator.clipboard.writeText(outputText).then(() => {
      showToast('✓ Copied to clipboard!');
    }).catch(() => {
      // Fallback for older browsers
      elements.output.select();
      document.execCommand('copy');
      showToast('✓ Copied to clipboard!');
    });
  }

  // Download button handler
  function handleDownload(e) {
    e.preventDefault();
    e.stopPropagation();

    const outputText = elements.output ? elements.output.value.trim() : '';
    
    if (!outputText) {
      showToast('⚠️ Nothing to download!', 'error');
      return;
    }

    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'humanized-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('✓ File downloaded!');
  }

  // Clear button handler
  function handleClear(e) {
    e.preventDefault();
    e.stopPropagation();

    if (elements.input) elements.input.value = '';
    if (elements.output) elements.output.value = '';
    
    showToast('✓ Cleared!');
    updateStats();
  }

  // Theme toggle handler
  function handleThemeToggle(e) {
    e.preventDefault();
    e.stopPropagation();

    const html = document.documentElement;
    const isDark = html.dataset.theme === 'dark';
    html.dataset.theme = isDark ? 'light' : 'dark';
    
    if (elements.themeToggle) {
      elements.themeToggle.textContent = isDark ? '☀️ Dark' : '🌙 Light';
    }
    
    showToast(`✓ Switched to ${isDark ? 'Light' : 'Dark'} mode`);
  }

  // History toggle handler
  function handleHistoryToggle(e) {
    e.preventDefault();
    e.stopPropagation();

    if (elements.historyDropdown) {
      elements.historyDropdown.classList.toggle('show');
    }
  }

  // Clear history handler
  function handleClearHistory(e) {
    e.preventDefault();
    e.stopPropagation();

    history = [];
    saveHistory();
    renderHistory();
    
    if (elements.historyDropdown) {
      elements.historyDropdown.classList.remove('show');
    }
    
    showToast('✓ History cleared!');
  }

  // Handle clicks outside dropdown
  function handleOutsideClick(e) {
    if (elements.historyDropdown && 
        !elements.historyDropdown.contains(e.target) && 
        e.target !== elements.historyBtn) {
      elements.historyDropdown.classList.remove('show');
    }
  }

  // Humanize text logic
  function humanizeText(text) {
    let result = text;
    const wordMap = WORD_MAPS[config.tone] || WORD_MAPS.chat;

    // Replace AI words with human alternatives
    Object.keys(wordMap).forEach(aiWord => {
      const regex = new RegExp(`\\b${aiWord}\\b`, 'gi');
      if (Math.random() < config.syn) {
        result = result.replace(regex, wordMap[aiWord]);
      }
    });

    // Add connecting words
    const connectors = ['That said,', 'Honestly,', 'Look,', 'Basically,', 'I mean,'];
    const sentences = result.split(/(?<=[.!?])\s+/);
    
    if (config.trans > 0.3 && sentences.length > 2) {
      const insertPos = Math.floor(Math.random() * (sentences.length - 1)) + 1;
      const connector = connectors[Math.floor(Math.random() * connectors.length)];
      sentences[insertPos] = connector + ' ' + sentences[insertPos];
    }

    result = sentences.join(' ');

    // Vary sentence structure (burst)
    if (config.burst > 0.7) {
      result = result.replace(/\. /g, (match, offset, string) => {
        if (Math.random() < 0.3 && offset > 50) {
          return '. Well, ';
        }
        return match;
      });
    }

    // Fix punctuation
    if (config.punct > 0.5) {
      result = result.replace(/,(\w)/g, ', $1');
      result = result.replace(/\s+,/g, ',');
    }

    return result;
  }

  // Update statistics
  function updateStats() {
    const text = elements.output ? elements.output.value : '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.trim() ? text.split('\n').length : 0;
    
    const modeName = MODES[config.tone]?.name || 'Casual';
    
    if (elements.wordCount) elements.wordCount.textContent = `Words: ${words}`;
    if (elements.lineCount) elements.lineCount.textContent = `Lines: ${lines}`;
    if (elements.modeDisplay) elements.modeDisplay.textContent = `Mode: ${modeName}`;

    // Update readiness meter
    const readiness = Math.min(100, Math.round((config.burst + config.syn + config.trans + config.punct) / 4 * 100));
    if (elements.readinessMeter) {
      elements.readinessMeter.style.width = `${readiness}%`;
    }
  }

  // Toast notification
  function showToast(message, type = 'success') {
    if (!elements.toast) return;

    elements.toast.textContent = message;
    elements.toast.className = `toast show ${type}`;

    setTimeout(() => {
      elements.toast.classList.remove('show');
    }, 2500);
  }

  // History functions
  function addToHistory(text) {
    const item = {
      id: Date.now(),
      text: text,
      preview: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      time: new Date().toLocaleTimeString()
    };
    
    history.unshift(item);
    if (history.length > 10) history.pop();
    
    saveHistory();
    renderHistory();
  }

  function renderHistory() {
    if (!elements.historyList) return;

    if (history.length === 0) {
      elements.historyList.innerHTML = '<p style="color: var(--muted); padding: 20px; text-align: center;">No history yet.</p>';
      return;
    }

    elements.historyList.innerHTML = history.map(item => `
      <div class="history-item" data-id="${item.id}">
        <span class="time">${item.time}</span>
        <span class="preview">${escapeHtml(item.preview)}</span>
      </div>
    `).join('');

    // Bind click events to history items
    elements.historyList.querySelectorAll('.history-item').forEach(item => {
      item.addEventListener('click', function() {
        const id = parseInt(this.dataset.id);
        const histItem = history.find(h => h.id === id);
        if (histItem && elements.output) {
          elements.output.value = histItem.text;
          elements.historyDropdown.classList.remove('show');
          showToast('✓ Restored from history!');
          updateStats();
        }
      });
    });
  }

  function saveHistory() {
    try {
      localStorage.setItem('humanizer-history', JSON.stringify(history));
    } catch (e) {
      console.warn('Could not save history:', e);
    }
  }

  function loadHistory() {
    try {
      const saved = localStorage.getItem('humanizer-history');
      if (saved) {
        history = JSON.parse(saved);
        renderHistory();
      }
    } catch (e) {
      console.warn('Could not load history:', e);
      history = [];
    }
  }

  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

})();
