(function(){
    // Simple toast utility
    function ensureContainer(){
        let container = document.getElementById('toastContainer');
        if(!container){
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.style.position = 'fixed';
            container.style.right = '20px';
            container.style.top = '20px';
            container.style.zIndex = '99999';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.gap = '10px';
            container.style.alignItems = 'flex-end';
            document.body.appendChild(container);

            const style = document.createElement('style');
            style.innerHTML = `
                .toast-item{ min-width: 220px; max-width: 420px; padding: 12px 14px; border-radius: 8px; color: #fff; box-shadow: 0 6px 24px rgba(0,0,0,0.45); font-family: Poppins, Arial, sans-serif; display:flex; gap:10px; align-items:flex-start; }
                .toast-success{ background: linear-gradient(135deg,#2bbf7a,#1a8f4a); }
                .toast-error{ background: linear-gradient(135deg,#d9534f,#b72e2e); }
                .toast-info{ background: linear-gradient(135deg,#333,#555); }
                .toast-warn{ background: linear-gradient(135deg,#f0ad4e,#d48a06); color:#000; }
                .toast-close{ margin-left: 8px; cursor:pointer; opacity:0.8; border: none; background: transparent; color: inherit; font-weight:700; }
                .toast-title{ font-weight:700; margin-bottom:4px; }
                .toast-body{ font-size:0.95rem; line-height:1.2; }
                @keyframes toastIn { from { transform: translateY(-10px); opacity:0 } to { transform: translateY(0); opacity:1 } }
                @keyframes toastOut { from { transform: translateY(0); opacity:1 } to { transform: translateY(-10px); opacity:0 } }
            `;
            document.head.appendChild(style);
        }
        return container;
    }

    window.showToast = function(message, type='info', duration=3500){
        const container = ensureContainer();
        const toast = document.createElement('div');
        toast.className = 'toast-item toast-' + (type || 'info');
        toast.style.animation = 'toastIn 240ms ease-out';
        toast.style.position = 'relative';

        // allow HTML
        const body = document.createElement('div');
        body.className = 'toast-body';
        body.innerHTML = message;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'toast-close';
        closeBtn.innerHTML = '✕';
        closeBtn.onclick = function(){
            clearTimeout(timeout);
            removeToast(toast);
        };

        toast.appendChild(body);
        toast.appendChild(closeBtn);
        container.appendChild(toast);

        const timeout = setTimeout(() => removeToast(toast), duration);

        function removeToast(node){
            node.style.animation = 'toastOut 200ms ease-in';
            node.style.pointerEvents = 'none';
            setTimeout(()=>{
                node.remove();
            },220);
        }

        return toast;
    };

})();
