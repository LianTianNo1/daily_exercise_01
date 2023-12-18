let col = 0; // 当前颜色索引
const colors = ['#ff708d', '#598bff', '#42aaff', '#ffc94d', '#2ce69b']; // 背景颜色数组

document.addEventListener('DOMContentLoaded', () => {
    // 当DOM加载完成后执行以下操作

    // 切换背景颜色按钮点击事件
    document.querySelector('.background-btn').addEventListener('click', () => {
        document.querySelector('.content').style.background = colors[col]; // 切换背景颜色
        col = (col + 1) % colors.length; // 更新颜色索引
        canvasFunction(); // 执行canvas相关操作
    });

    // 输入框内容变化事件
    document.querySelector(".input-field").addEventListener("input", (event) => {
        canvasFunction(); // 执行canvas相关操作
    });

    // 提交按钮点击事件
    document.querySelector('.submit-btn').addEventListener('click', () => {
        const text = document.querySelector('.input-field').value; // 获取输入框内容
        document.querySelector('.input-field').value = ''; // 清空输入框
        const div = document.createElement('div');
        div.setAttribute('class', 'item');
        div.innerText = text;
        document.querySelector('.list').appendChild(div); // 将文本添加到列表中
        canvasFunction(); // 执行canvas相关操作
    });

    // 获取画布和相关参数
    const box = document.getElementById('box');
    const boxBoundingClientRect = box.getBoundingClientRect();
    const w = boxBoundingClientRect.width;
    const h = boxBoundingClientRect.height;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    canvas.setAttribute('width', w);
    canvas.setAttribute('height', h);
    canvas.style.display = 'none';
    box.appendChild(canvas);

    const img = document.querySelector('img');
    const ctx = canvas.getContext("2d");
    const allChunks = [];
    // 捕获 canvas 元素的内容并将其作为媒体流进行处理。这个方法创建了一个 MediaStream 对象，代表了一系列的视频帧，可以将 canvas 内容作为视频源
    const stream = canvas.captureStream(60); // 创建视频流，每秒60帧

    // 创建媒体录制器
    // 创建了一个 MediaRecorder 对象，用于录制媒体流，通常用于捕获视频。第一个参数是 MediaStream 对象（在这里是从 canvas 获取的流），第二个参数是一个选项对象。选项中的 mimeType 指定了录制的媒体类型和编解码器，而 bitsPerSecond 选项设置了录制的比特率。
    const recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        bitsPerSecond: 1000000
    });

    // 设置 ondataavailable 事件处理程序，代码在每次有数据可用时将录制的数据块推送到数组 allChunks 中。这个数组稍后将用于构建最终的视频。
    recorder.ondataavailable = (e) => {
        allChunks.push(e.data); // 将视频帧数据保存到数组中
    };

    // 开始录制按钮点击事件
    document.querySelector('.start-btn').addEventListener('click', () => {
        if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
            canvasFunction(); // 执行canvas相关操作
            console.log("开始录制");
            recorder.start(10); // 每10毫秒保存一帧
        }
    });

    // 停止录制按钮点击事件
    document.querySelector('.stop-btn').addEventListener('click', () => {
        console.log("停止录制");
        canvasFunction(); // 执行canvas相关操作
        setTimeout(() => {
            console.log("保存录制结果");
            recorder.stop(); // 停止录制
            // 使用 Blob 构造函数将数据数组转换为 Blob 对象，表示整个视频。
            const fullBlob = new Blob(allChunks); // 将所有帧数据合并成Blob
            const videoUrl = window.URL.createObjectURL(fullBlob);

            const video = document.createElement('video');
            video.controls = true;
            video.src = videoUrl;
            video.muted = true;
            video.autoplay = true;
            document.body.appendChild(video); // 在页面中显示录制的视频
        }, 1000);
    });

    // canvas相关操作函数
    const canvasFunction = () => {
        console.log("执行canvas操作");
        html2canvas(box).then(canvas => {
            const imgStr = canvas.toDataURL("image/png"); // 将canvas转换为base64格式的图片字符串
            img.src = imgStr;
            img.onload = function () {
                ctx.drawImage(img, 0, 0, w, h); // 将图片绘制到canvas上
            }
        });
    }
});
