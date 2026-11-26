/* ==========================================================================
   Portfolio Category Filtering & Project Details Modal
   ========================================================================== */

(function () {
  const PROJECT_DETAILS = {
    'project-1': {
      category: 'Financial Statement Analysis',
      title: 'Comparative Financial Ratio & Liquidity Study',
      summary:
        'A structured financial analysis exercise examining multi-period Balance Sheets and Income Statements to evaluate short-term liquidity, capital structure solvency, and operating profitability.',
      deliverables: [
        'Horizontal and vertical common-size financial statement schedules',
        'Current ratio, quick ratio, debt-to-equity, and net profit margin calculations',
        'Concise executive commentary translating financial ratios into clear operational observations'
      ],
      tools: ['Financial Ratios', 'Balance Sheet', 'Income Statement', 'Microsoft Excel']
    },
    'project-2': {
      category: 'Budget Planning & Analysis',
      title: 'Operational Budget & Variance Tracking Workbook',
      summary:
        'An organized budget planning and expense monitoring spreadsheet designed to compare planned allocations against actual monthly expenditures and highlight key variances.',
      deliverables: [
        'Monthly operating expense budget template categorized by cost center',
        'Automated variance formulas (favorable vs. unfavorable deviations)',
        'Pivot Table summary views for rapid monthly management review'
      ],
      tools: ['Budget Analysis', 'Pivot Tables', 'Expense Tracking', 'Excel Formulas']
    },
    'project-3': {
      category: 'Accounting Reporting',
      title: 'End-to-End General Ledger & Financial Reporting Cycle',
      summary:
        'A complete accounting cycle workflow demonstrating methodical transaction recording, account reconciliation, adjusting entries, and core financial statement preparation.',
      deliverables: [
        'Chronological general journal entries and categorized general ledger accounts',
        'Unadjusted and adjusted trial balance reconciliation schedules',
        'Formatted Income Statement, Statement of Financial Position, and Cash Flow Statement'
      ],
      tools: ['General Ledger', 'Journal Entries', 'Account Reconciliation', 'Financial Reporting']
    },
    'project-4': {
      category: 'Financial Data Visualization',
      title: 'Executive Cash Flow & Expense Summary Visual Report',
      summary:
        'A clean visual reporting layout summarizing cash inflows, operating outflows, and expense composition so stakeholders can review financial performance at a glance.',
      deliverables: [
        'Structured cash inflow and outflow summary tables',
        'Clear visual charts highlighting expense distribution and monthly cash trends',
        'Readable narrative notes supporting business administration reviews'
      ],
      tools: ['Cash Flow Statements', 'Excel Charts', 'Financial Data Management', 'Business Administration']
    }
  };

  // Category Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('is-hidden');
          card.classList.add('is-visible');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // Project Modal
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalSummary = document.getElementById('modalSummary');
  const modalDeliverables = document.getElementById('modalDeliverables');
  const modalTools = document.getElementById('modalTools');
  const viewButtons = document.querySelectorAll('.view-project-btn');

  function openProjectModal(projectId) {
    const data = PROJECT_DETAILS[projectId];
    if (!data || !modal) return;

    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalSummary.textContent = data.summary;

    modalDeliverables.innerHTML = '';
    data.deliverables.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      modalDeliverables.appendChild(li);
    });

    modalTools.innerHTML = '';
    data.tools.forEach((tool) => {
      const span = document.createElement('span');
      span.textContent = tool;
      modalTools.appendChild(span);
    });

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  viewButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      openProjectModal(btn.getAttribute('data-project-id'));
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeProjectModal();
    }
  });
})();
