'use strict';

const form = document.getElementById('source-request');
const result = document.getElementById('email-result');
const preview = document.getElementById('email-preview');
const status = document.getElementById('copy-status');
document.getElementById('prepare-email').disabled = false;

form.addEventListener('input', (event) => {
  event.target.setCustomValidity?.('');
  // Hide a previously prepared message whenever the applicant edits their details.
  if (event.target !== preview) result.hidden = true;
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  for (const field of form.querySelectorAll('[required]')) {
    field.setCustomValidity(field.value.trim() ? '' : '请填写此项 / Please complete this field.');
  }
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const value = (name) => String(data.get(name) || '').trim();
  const subject = 'PolymerFFKit source code request / 源码申请';
  const body = [
    '您好 / Dear PolymerFFKit author,', '',
    '我希望申请 PolymerFFKit 源代码，申请信息如下：',
    'I would like to request the PolymerFFKit source code. My details are:', '',
    `姓名 / Full name: ${value('fullName')}`,
    `单位（学校）/ Institution: ${value('institution')}`,
    `邮箱 / Email: ${value('email')}`,
    `院系 / 课题组 / Department / Lab: ${value('department') || '—'}`,
    `身份 / 职务 / Role: ${value('role') || '—'}`, '',
    '研究方向及申请用途 / Research & intended use:', value('purpose'), '',
    '请告知源码获取方式和使用条件。谢谢！',
    'Please let me know the availability and terms of use. Thank you.'
  ].join('\r\n');
  document.getElementById('open-email').href =
    `mailto:tongshi@zju.edu.cn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  preview.value = `To: tongshi@zju.edu.cn\r\nSubject: ${subject}\r\n\r\n${body}`;
  status.textContent = '';
  result.hidden = false;
  document.getElementById('email-result-title').focus();
});

document.getElementById('copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(preview.value);
    status.textContent = '已复制，请粘贴到邮箱并发送。 / Copied. Paste into your email and send.';
  } catch {
    preview.focus();
    preview.select();
    status.textContent = '请长按或按 Ctrl+C（Mac：⌘C）复制已选中的内容。 / Copy the selected text manually.';
  }
});
