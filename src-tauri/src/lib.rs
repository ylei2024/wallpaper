use std::ffi::OsStr;
use std::os::windows::ffi::OsStrExt;
use winapi::um::winuser::{
    SystemParametersInfoW, SPIF_SENDWININICHANGE, SPIF_UPDATEINIFILE, SPI_SETDESKWALLPAPER,
};

#[tauri::command]
fn set_wallpaper(path: String) -> Result<(), String> {
    // 将路径转换为 UTF-16 编码
    let wide_path: Vec<u16> = OsStr::new(&path).encode_wide().chain(Some(0)).collect();
    // 调用 Windows API 设置壁纸
    unsafe {
        if SystemParametersInfoW(
            SPI_SETDESKWALLPAPER,
            0,
            wide_path.as_ptr() as *mut _,
            SPIF_UPDATEINIFILE | SPIF_SENDWININICHANGE,
        ) == 0
        {
            return Err("Failed to set wallpaper".to_string());
        }
    }
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![set_wallpaper])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
