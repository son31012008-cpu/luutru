// A5K60 Website - Main JavaScript File
// Backend simulation and API integration

// ===== FIREBASE SDK & CONFIG (THÊM VÀO ĐẦU) =====
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-database-compat.js"></script>

const firebaseConfig = {
    apiKey: "AIzaSyAbD9ave4WUPk9MndVZ7_3_f5XyhNVepEY",
    authDomain: "a5k60-website.firebaseapp.com",
    databaseURL: "https://a5k60-website-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "a5k60-website",
    storageBucket: "a5k60-website.firebasestorage.app",
    messagingSenderId: "1083754554024",
    appId: "1:1083754554024:web:6847ea23b19a9369dc989d"
};

firebase.initializeApp(firebaseConfig);
window.db = firebase.database();
console.log('🔥 Firebase đã kết nối!');
// ===== KẾT THÚC THÊM =====

class A5K60Backend {
    constructor() {
        // ===== THAY ĐỔI: Không khởi tạo users từ local nữa =====
        this.setupFirebaseAuth();
        this.setupEventListeners();
        this.initializeCloudStorage();
        this.startFirebaseSync(); // Thêm sync real-time
    }

    // ===== THÊM MỚI: Firebase Auth =====
    setupFirebaseAuth() {
        this.currentUser = null;
        this.usersCache = {};
        
        const sessionUser = localStorage.getItem('currentUser');
        if (sessionUser) {
            this.currentUser = JSON.parse(sessionUser);
        }
    }

    async loadUsersFromFirebase() {
        try {
            const snapshot = await db.ref('users').once('value');
            this.usersCache = snapshot.val() || {};
            return this.usersCache;
        } catch (error) {
            console.error('❌ Lỗi load users:', error);
            return {};
        }
    }
    // ===== KẾT THÚC THÊM =====

    // ===== GIỮ NGUYÊN 100%: initializeDatabase cũ (nhưng không dùng nữa) =====
    initializeDatabase() {
        // Không xóa hàm này để không ảnh hưởng code cũ
        // Nhưng sẽ không được gọi nữa
        console.log('ℹ️ initializeDatabase đã deprecated, dùng Firebase');
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: generateMemberName =====
    generateMemberName(index) {
        const names = [
            'Võ Đăng Hoàng Anh', 'Võ Hoàng Anh', 'Đinh Viết Dũng', 'Lê Thị Thùy Dương', 'Nguyễn Hàn Giang',
            'Nguyễn Thị Diễm Hằng', 'Nguyễn Thị Thúy Hằng', 'Nguyễn Bảo Hoàng', 'Nguyễn Văn Quốc Hội', 'Huỳnh Gia Huy',
            'Trần Huy Hoàng', 'Hồ Công Hưng', 'Nguyễn Anh Kha', 'Lê Quang Khoa', 'Nguyễn Anh Khôi',
            'Mai Đăng Linh', 'Nguyễn Hoài Phương Linh', 'Nguyễn Thị Khánh Linh', 'Nguyễn Thảo Ly', 'Nguyễn Ngọc Huy Minh',
            'Võ Khánh Minh', 'Lê Thị Trà My', 'Nguyễn Diễm My', 'Võ Trần Thục Nghi', 'Lê Hữu Nghĩa',
            'Nguyễn Bích Ngọc', 'Trần Thị Thanh Ngọc', 'Nguyễn Đăng Nguyên', 'Nguyễn Xuân Hoàng Nguyên', 'Phạm Hoàng Thảo Nguyên',
            'Lê Minh Nhật', 'Nguyễn Thị Quỳnh Như', 'Đặng Thành Phát', 'Lê Ngọc Quang', 'Trương Nhật Sơn',
            'Nguyễn Thái Sơn', 'Vũ Minh Sơn', 'Nguyễn Quang Thanh', 'Trần Hương Trà', 'Nguyễn Ngọc Thảo Trang',
            'Trần Ngọc Huyền Trân', 'Lê Nguyễn Khánh Triều', 'Lê Ngọc Thanh Trúc', 'Lê Võ Anh Tuấn', 'Lê Thanh Tuyến',
            'Nguyễn Hà Vy'
        ];
        return names[index - 1] || `Thành viên ${index.toString().padStart(2, '0')}`;
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: generateAvatar =====
    generateAvatar() {
        const emojis = ['🐵', '🙈', '🙉', '🙊', '🦍', '🐒'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: initializeCloudStorage =====
    initializeCloudStorage() {
        this.cloudStorage = {
            upload: (file, callback) => {
                setTimeout(() => {
                    const fileUrl = URL.createObjectURL(file);
                    callback({
                        success: true,
                        url: fileUrl,
                        fileId: this.generateFileId(),
                        timestamp: new Date().toISOString()
                    });
                }, 1000);
            },
            
            delete: (fileId, callback) => {
                setTimeout(() => {
                    callback({ success: true });
                }, 500);
            },
            
            getFiles: (userId, callback) => {
                setTimeout(() => {
                    const mockFiles = this.getUserFiles(userId);
                    callback({ success: true, files: mockFiles });
                }, 500);
            }
        };
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: generateFileId =====
    generateFileId() {
        return 'file_' + Math.random().toString(36).substr(2, 9);
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: getUserFiles =====
    getUserFiles(userId) {
        const baseFiles = [
            {
                id: 'file_1',
                name: 'profile_picture.jpg',
                type: 'image',
                url: 'https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=Profile ',
                uploadDate: '2024-01-15'
            },
            {
                id: 'file_2',
                name: 'memory_1.jpg',
                type: 'image',
                url: 'https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=Memory+1 ',
                uploadDate: '2024-02-20'
            }
        ];
        
        const additionalFiles = [];
        for (let i = 3; i <= Math.floor(Math.random() * 5) + 3; i++) {
            additionalFiles.push({
                id: `file_${i}`,
                name: `photo_${i}.jpg`,
                type: 'image',
                url: `https://via.placeholder.com/400x300/ ${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=Photo+${i}`,
                uploadDate: `2024-0${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 28) + 1}`
            });
        }
        
        return [...baseFiles, ...additionalFiles];
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: setupEventListeners =====
    setupEventListeners() {
        this.setupAuth();
        this.setupFileUpload();
        this.setupSocialLinks();
        this.setupAdminFeatures();
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== THAY ĐỔI NHẸ: setupAuth (dùng Firebase) =====
    setupAuth() {
        // Không cần khởi tạo users ở đây nữa
        // this.currentUser đã được setup ở constructor
    }
    // ===== KẾT THÚC THAY ĐỔI =====

    // ===== THAY ĐỔI: login (dùng Firebase) =====
    async login(username, password) {
        // Load users từ Firebase nếu chưa có
        if (Object.keys(this.usersCache).length === 0) {
            await this.loadUsersFromFirebase();
        }
        
        // Kiểm tra login
        if (this.usersCache[username] && this.usersCache[username].password === password) {
            const user = this.usersCache[username];
            this.currentUser = {
                username: username,
                role: user.role,
                memberId: user.memberId,
                name: user.name,
                avatar: user.avatar
            };
            
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return { success: true, user: this.currentUser };
        }
        
        return { success: false, message: 'Tài khoản hoặc mật khẩu không đúng!' };
    }
    // ===== KẾT THÚC THAY ĐỔI =====

    // ===== GIỮ NGUYÊN 100%: logout =====
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        return { success: true };
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: getCurrentUser =====
    getCurrentUser() {
        return this.currentUser;
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: hasPermission =====
    hasPermission(memberId) {
        if (!this.currentUser) return false;
        return this.currentUser.role === 'admin' || this.currentUser.memberId === memberId;
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: setupFileUpload =====
    setupFileUpload() {
        window.uploadFile = (file, callback) => {
            this.cloudStorage.upload(file, callback);
        };
        window.getUserFiles = (userId, callback) => {
            this.cloudStorage.getFiles(userId, callback);
        };
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: setupSocialLinks =====
    setupSocialLinks() {
        window.saveSocialLinks = (memberId, links) => {
            if (!this.hasPermission(memberId)) {
                return { success: false, message: 'Bạn không có quyền cập nhật!' };
            }
            
            const memberData = this.getMemberData(memberId);
            memberData.socialLinks = { ...memberData.socialLinks, ...links };
            this.saveMemberData(memberId, memberData);
            
            return { success: true };
        };
        
        window.getSocialLinks = (memberId) => {
            const memberData = this.getMemberData(memberId);
            return memberData.socialLinks || {};
        };
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: getMemberData =====
    getMemberData(memberId) {
        const data = localStorage.getItem(`member_${memberId}`);
        if (data) {
            return JSON.parse(data);
        }
        
        return {
            id: memberId,
            name: this.users[memberId]?.name || `Thành viên ${memberId}`,
            avatar: this.users[memberId]?.avatar || '🐵',
            avatarUrl: null,
            bio: `Thành viên số ${memberId} của nhóm A5K60`,
            joinDate: `2024-01-15`,
            personalInfo: 'Thành viên tuyệt vời của nhóm A5K60.',
            hobbies: ['Âm nhạc', 'Du lịch', 'Nhiếp ảnh'],
            favoriteQuote: '"Life is what happens when you\'re busy making other plans."',
            socialLinks: { facebook: '', instagram: '', locket: '' },
            media: [],
            groups: []
        };
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: saveMemberData =====
    saveMemberData(memberId, data) {
        localStorage.setItem(`member_${memberId}`, JSON.stringify(data));
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: setupAdminFeatures =====
    setupAdminFeatures() {
        window.getAdminDashboard = () => {
            if (!this.currentUser || this.currentUser.role !== 'admin') {
                return { success: false, message: 'Bạn không có quyền truy cập!' };
            }
            
            const users = JSON.parse(localStorage.getItem('a5k60_users') || '{}');
            const totalUsers = Object.keys(users).length;
            const memberCount = totalUsers - 1;
            const storageUsed = Math.floor(Math.random() * 500) + 100;
            const storageLimit = 1000;
            const recentActivity = this.getRecentActivity();
            
            return {
                success: true,
                data: {
                    totalUsers,
                    memberCount,
                    storageUsed,
                    storageLimit,
                    recentActivity
                }
            };
        };
        
        window.getAllMembers = () => {
            if (!this.currentUser || this.currentUser.role !== 'admin') {
                return { success: false, message: 'Bạn không có quyền truy cập!' };
            }
            
            const users = JSON.parse(localStorage.getItem('a5k60_users') || '{}');
            const members = Object.keys(users)
                .filter(username => username !== 'admin')
                .map(username => ({
                    id: users[username].memberId,
                    name: users[username].name,
                    avatar: users[username].avatar,
                    username: username
                }));
            
            return { success: true, members };
        };
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: getRecentActivity =====
    getRecentActivity() {
        const activities = [
            'Member 01 đã upload ảnh mới',
            'Member 15 đã cập nhật thông tin',
            'Member 23 đã đăng nhập',
            'Member 07 đã upload video',
            'Member 42 đã cập nhật liên kết'
        ];
        return activities.slice(0, Math.floor(Math.random() * 3) + 3);
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: setupAvatarManagement =====
    setupAvatarManagement() {
        window.uploadAvatar = (memberId, file, callback) => {
            if (!this.hasPermission(memberId)) {
                callback({ success: false, message: 'Bạn không có quyền cập nhật!' });
                return;
            }
            
            this.cloudStorage.upload(file, (result) => {
                if (result.success) {
                    const memberData = this.getMemberData(memberId);
                    memberData.avatarUrl = result.url;
                    this.saveMemberData(memberId, memberData);
                    
                    // ===== THÊM: Sync lên Firebase =====
                    if (typeof db !== 'undefined') {
                        db.ref(`members/${memberId}/avatar`).set(result.url);
                    }
                }
                callback(result);
            });
        };
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: setupGroupManagement =====
    setupGroupManagement() {
        window.createGroup = (groupData, callback) => {
            const { name, description, members, creatorId } = groupData;
            if (!this.hasPermission(creatorId)) {
                callback({ success: false, message: 'Bạn không có quyền tạo nhóm!' });
                return;
            }
            
            const groupId = this.generateId();
            const group = {
                id: groupId,
                name,
                description,
                members: [creatorId, ...members],
                creatorId,
                createdAt: new Date().toISOString(),
                media: []
            };
            
            const groups = JSON.parse(localStorage.getItem('a5k60_groups') || '[]');
            groups.push(group);
            localStorage.setItem('a5k60_groups', JSON.stringify(groups));
            callback({ success: true, group });
        };
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: setupCentralizedStorage =====
    setupCentralizedStorage() {
        window.storeMediaCentrally = (memberId, mediaItem) => {
            const centralMedia = JSON.parse(localStorage.getItem('a5k60_central_media') || '[]');
            centralMedia.push({
                ...mediaItem,
                memberId,
                storedAt: new Date().toISOString()
            });
            localStorage.setItem('a5k60_central_media', JSON.stringify(centralMedia));
        };
        
        window.getCentralMedia = () => {
            if (!this.currentUser || this.currentUser.role !== 'admin') {
                return { success: false, message: 'Bạn không có quyền truy cập!' };
            }
            
            const centralMedia = JSON.parse(localStorage.getItem('a5k60_central_media') || '[]');
            return { success: true, media: centralMedia };
        };
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: setupFacebookAPI =====
    setupFacebookAPI() {
        window.facebookAPI = {
            getProfile: (userId, callback) => {
                setTimeout(() => {
                    callback({
                        success: true,
                        data: {
                            name: 'Facebook User',
                            profilePicture: 'https://via.placeholder.com/100x100/1877F2/FFFFFF?text=FB ',
                            link: 'https://facebook.com/user '
                        }
                    });
                }, 1000);
            }
        };
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: showNotification =====
    static showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 300
        });
        
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 300],
                opacity: [1, 0],
                duration: 300,
                complete: () => notification.remove()
            });
        }, 3000);
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: formatDate =====
    static formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== GIỮ NGUYÊN 100%: generateId =====
    static generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
    // ===== KẾT THÚC GIỮ NGUYÊN =====

    // ===== THÊM MỚI: Hàm đồng bộ lên Firebase =====
    startFirebaseSync() {
        if (typeof firebase === 'undefined') return;
        
        console.log('🔄 Đang khởi tạo Firebase Sync...');
        
        // ===== 1. Auto-sync khi có thay đổi từ Firebase =====
        db.ref('members').on('value', (snapshot) => {
            const members = snapshot.val();
            if (!members) return;
            
            console.log('📡 Firebase members updated:', Object.keys(members).length);
            
            // Cập nhật localStorage nếu có thay đổi
            Object.keys(members).forEach(memberId => {
                const firebaseData = members[memberId];
                const localData = localStorage.getItem(`member_${memberId}`);
                
                if (!localData || JSON.parse(localData).updatedAt !== firebaseData.updatedAt) {
                    localStorage.setItem(`member_${memberId}`, JSON.stringify(firebaseData));
                    
                    // Phát sự kiện để index.html biết thay đổi
                    window.dispatchEvent(new CustomEvent('memberUpdated', { detail: { memberId, data: firebaseData } }));
                }
            });
        });
        
        // ===== 2. Sync localStorage cũ lên Firebase 1 lần =====
        this.syncLocalToFirebaseOnce();
    }
    
    async syncLocalToFirebaseOnce() {
        const hasSynced = localStorage.getItem('firebase_synced_once_v2');
        if (hasSynced) return;
        
        console.log('🔄 Đang đồng bộ dữ liệu cũ lên Firebase...');
        
        const updates = {};
        let count = 0;
        
        for (let i = 1; i <= 46; i++) {
            const memberId = i.toString().padStart(2, '0');
            const localData = localStorage.getItem(`member_${memberId}`);
            
            if (localData) {
                try {
                    const snapshot = await db.ref(`members/${memberId}`).once('value');
                    if (!snapshot.exists()) {
                        updates[`members/${memberId}`] = JSON.parse(localData);
                        count++;
                    }
                } catch (e) {
                    console.warn(`⚠️ Bỏ qua ${memberId}:`, e.message);
                }
            }
        }
        
        if (count > 0) {
            await db.ref().update(updates);
            console.log(`✅ Đã đồng bộ ${count} thành viên`);
        }
        
        localStorage.setItem('firebase_synced_once_v2', 'true');
    }
    // ===== KẾT THÚC THÊM MỚI =====
}

// Khởi tạo backend
const backend = new A5K60Backend();

// Export for use in other files
window.A5K60Backend = A5K60Backend;
window.backend = backend;
