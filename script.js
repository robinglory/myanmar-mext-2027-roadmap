// 🚀 1. MARKDOWN FETCH & RENDER FUNCTION
async function viewMarkdown(filename, title) {

    const isJapanese = window.location.href.includes('-jp.html');

    const loadingText = isJapanese ? "ドキュメントを読み込んでいます..." : "စာတမ်းအချက်အလက်များကို ခေါ်ယူပြင်ဆင်နေပါသည်...";
    const errorFetch = isJapanese ? "ファイルが見つからないか、パスが間違っています。" : "ဖိုင်ရှာမတွေ့ပါ သို့မဟုတ် လမ်းကြောင်းမှားယွင်းနေပါသည်။";
    const errorTitle = isJapanese ? "ドキュメントを開けません" : "စာတမ်း ဖွင့်ရှု၍ မရပါ";
    const errorNote = isJapanese ? 
        "<strong>💡 注意 (For Local Testing):</strong> ローカル環境(<code>file:///...</code>)で直接開いている場合、ブラウザのセキュリティ制限(CORSポリシー)によりファイルの読み込みがブロックされる可能性があります。<br><br>- <strong>VS Code Live Server</strong> 拡張機能を使用するか、<br>- <strong>GitHub Pages</strong> にアップロードすると正常に動作します。" 
        : 
        "<strong>💡 သတိပြုရန် (For Local Testing):</strong> သင်သည် ယခု Web ကို ကွန်ပျူတာပေါ်တွင် <code>file:///...</code> ဖြင့် တိုက်ရိုက်ဖွင့်ထားပါက Browser ၏ လုံခြုံရေးစည်းကမ်း (CORS Policy) ကြောင့် ဖိုင်များကို Fetch လုပ်ခွင့် မပြုခြင်း ဖြစ်နိုင်ပါသည်။<br><br>- <strong>VS Code Live Server</strong> Extension ကိုသုံး၍ ဖွင့်ကြည့်ပါ၊ (သို့မဟုတ်)<br>- <strong>GitHub Pages</strong> သို့ Upload တင်လိုက်ပါက 100% အပြည့်အဝ အလုပ်လုပ်ပါမည်။";

    document.getElementById('mdModalTitle').innerHTML = `<i class="bi bi-file-earmark-text me-2"></i>${title}`;
    document.getElementById('mdModalBody').innerHTML = `
        <div class="text-center my-5 py-5">
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status"></div>
            <p class="mt-3 text-muted fw-bold">${loadingText}</p>
        </div>`;
    
    var mdModal = new bootstrap.Modal(document.getElementById('markdownModal'));
    mdModal.show();

    try {
        const response = await fetch(filename);
        if (!response.ok) throw new Error(errorFetch);
        const text = await response.text();
        document.getElementById('mdModalBody').innerHTML = marked.parse(text);
    } catch (error) {
        document.getElementById('mdModalBody').innerHTML = `
            <div class="alert alert-danger p-4 rounded-3">
                <h6 class="fw-bold"><i class="bi bi-exclamation-triangle-fill me-2"></i>${errorTitle}</h6>
                <p class="mb-2"><strong>Error:</strong> ${error.message}</p>
                <hr>
                <p class="small mb-0">
                    ${errorNote}
                </p>
            </div>`;
    }
}

// 📊 2027 DATA CHARTS INITIALIZATION
document.addEventListener("DOMContentLoaded", function() {
    Chart.defaults.font.family = "'Noto Sans Myanmar', sans-serif";
    Chart.defaults.color = "#64748b";

    // 1. Funnel Chart (Elegant Muted Colors)
    // 1. Funnel Chart (5 Stages Verified Data)
    new Chart(document.getElementById('funnelChart'), {
        type: 'bar',
        data: {
            labels: ['Stage 1:', 'Stage 2:', 'Stage 3:', 'Stage 4:', 'Stage 5:'],
            datasets: [{
                data: [124, 67, 43, 32, 19], 
                backgroundColor: ['#94a3b8', '#3b82f6', '#0284c7', '#f59e0b', '#10b981'],
                borderRadius: 6,
                barThickness: 30
            }]
        },
        options: { 
            responsive: true, 
            plugins: { legend: { display: false } }, 
            scales: { 
                y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                x: { grid: { display: false } }
            } 
        }
    });

    // 2. Field of Study Chart (Navy & Gold Theme)
    new Chart(document.getElementById('fieldChart'), {
        type: 'bar',
        data: {
            labels: ['Engineering', 'Social Science', 'Humanities', 'Science', 'Medical & Dental', 'Agriculture', 'Other Niche Fields'],
            datasets: [{
                data: [17, 12, 4, 3, 2, 2, 3],
                backgroundColor: '#0f172a',
                borderColor: '#d4af37',
                borderWidth: 1.5,
                borderRadius: 4,
                barThickness: 18
            }]
        },
        options: { 
            indexAxis: 'y', 
            responsive: true, 
            plugins: { legend: { display: false } },
            scales: { 
                x: { grid: { color: '#f1f5f9' } },
                y: { grid: { display: false } }
            }
        }
    });

    // 3. Exam Language Track (Doughnut - Navy vs Gold)
    new Chart(document.getElementById('langChart'), {
        type: 'doughnut',
        data: {
            labels: ['English + Basic Japanese (94.4%)', 'Japanese N2 Level (5.6%)'],
            datasets: [{
                data: [117, 7],
                backgroundColor: ['#0f172a', '#d4af37'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: { 
            responsive: true, 
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } },
            cutout: '70%'
        }
    });

    // 4. Gender Chart (Grouped Bar Chart: Initial 124 vs Final 32)
    new Chart(document.getElementById('genderChart'), {
        type: 'bar',
        data: {
            labels: ['Stage 1: Initial 124', 'Stage 4: Interview 34'],
            datasets: [
                {
                    label: 'Female',
                    data: [90, 20], 
                    backgroundColor: '#3b82f6',
                    borderRadius: 4,
                    barThickness: 25
                },
                {
                    label: 'Male',
                    data: [34, 12], 
                    backgroundColor: '#0f172a',
                    borderRadius: 4,
                    barThickness: 25
                }
            ]
        },
        options: { 
            responsive: true, 
            plugins: { 
                legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } 
            },
            scales: { 
                y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                x: { grid: { display: false } }
            } 
        }
    });
});

// 🌙 DARK / LIGHT MODE TOGGLE LOGIC
function initTheme() {
    const savedTheme = localStorage.getItem('mext_theme');
    const icon = document.getElementById('themeIcon');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (icon) icon.className = 'bi bi-sun-fill';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('themeIcon');
    const isDark = document.body.classList.contains('dark-mode');
    
    if (isDark) {
        icon.className = 'bi bi-sun-fill';
        localStorage.setItem('mext_theme', 'dark');
    } else {
        icon.className = 'bi bi-moon-stars-fill';
        localStorage.setItem('mext_theme', 'light');
    }
}

// 📲 COPY TO CLIPBOARD FUNCTION
function copyPortalLink() {
    const portalUrl = "https://robinglory.github.io/myanmar-mext-2027-roadmap/";
    navigator.clipboard.writeText(portalUrl).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        const copyText = document.getElementById('copyText');
        
        copyBtn.style.backgroundColor = "#10b981"; // Turn Green
        copyBtn.style.color = "#ffffff";
        copyText.innerHTML = "Copied! ✔";
        
        setTimeout(() => {
            copyBtn.style.backgroundColor = ""; // Reset
            copyBtn.style.color = "";
            copyText.innerHTML = "Copy Link";
        }, 2500);
    });
}

// Run theme check on page load
document.addEventListener("DOMContentLoaded", function() {
    initTheme();
});

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('themeIcon');
    const isDark = document.body.classList.contains('dark-mode');
    
    if (isDark) {
        icon.className = 'bi bi-sun-fill';
        localStorage.setItem('mext_theme', 'dark');
    } else {
        icon.className = 'bi bi-moon-stars-fill';
        localStorage.setItem('mext_theme', 'light');
    }

    const giscusTheme = isDark ? 'transparent_dark' : 'light';
    const iframe = document.querySelector('iframe.giscus-frame');
    if (iframe) {
        iframe.contentWindow.postMessage(
            { giscus: { setConfig: { theme: giscusTheme } } },
            'https://giscus.app'
        );
    }
}