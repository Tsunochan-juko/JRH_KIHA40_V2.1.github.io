(() => {
  const button = document.querySelector('#download-selected');
  const status = document.querySelector('#download-status');
  const checks = [...document.querySelectorAll('.series-select')];
  if (!button || !status || !checks.length) return;

  const files = {
    common: 'downloads/[RTM]ASARI_JRH_40_V2.1_common.zip',
    sound: 'downloads/[RTM]ASARI_JRH_40_soundpack.zip',
    series: {
      '300': 'downloads/[RTM]ASARI_JRH_40_V2.1_300.zip',
      '330': 'downloads/[RTM]ASARI_JRH_40_V2.1_330.zip',
      '350': 'downloads/[RTM]ASARI_JRH_40_V2.1_350.zip',
      '400': 'downloads/[RTM]ASARI_JRH_40_V2.1_400.zip',
      '700': 'downloads/[RTM]ASARI_JRH_40_V2.1_700.zip',
      '1700': 'downloads/[RTM]ASARI_JRH_40_V2.1_1700.zip',
      '300_lite': 'downloads/[RTM]ASARI_JRH_40_V2.1_300_lite.zip',
      '330_lite': 'downloads/[RTM]ASARI_JRH_40_V2.1_330_lite.zip',
      '350_lite': 'downloads/[RTM]ASARI_JRH_40_V2.1_350_lite.zip',
      '700_lite': 'downloads/[RTM]ASARI_JRH_40_V2.1_700_lite.zip',
      '1700_lite': 'downloads/[RTM]ASARI_JRH_40_V2.1_1700_lite.zip',
      '400_lite': 'downloads/[RTM]ASARI_JRH_40_V2.1_400_lite.zip'
    }
  };

  const selectedPacks = () => checks.filter(check => check.checked).map(check => check.value);
  const downloadFiles = selected => {
    if (!selected.length) return [];
    const needsCommon = selected.some(pack => !pack.endsWith('_lite'));
    return [...new Set([
      ...(needsCommon ? [files.common] : []),
      files.sound,
      ...selected.map(pack => files.series[pack])
    ])];
  };

  const updateButton = () => {
    const selected = selectedPacks();
    const count = selected.length;
    button.disabled = count === 0;
    button.textContent = count ? '選択したパックをダウンロード' : 'パックを選択してください';
    const dependencies = selected.some(pack => !pack.endsWith('_lite')) ? '共通・音声パック' : '音声パック';
    status.textContent = count ? `車両パック${count}つ＋${dependencies}（合計${downloadFiles(selected).length}ファイル）` : '';
  };

  checks.forEach(check => check.addEventListener('change', updateButton));
  button.addEventListener('click', () => {
    const selected = selectedPacks();
    if (!selected.length) return;

    const urls = downloadFiles(selected);
    urls.forEach(url => {
      const link = document.createElement('a');
      link.href = url;
      link.download = '';
      link.hidden = true;
      document.body.append(link);
      link.click();
      link.remove();
    });
    status.textContent = `${urls.length}ファイルのダウンロードを開始しました。`;
  });

  updateButton();
})();



