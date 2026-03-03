/**
 * Copyright (C) 2024-present Puter Technologies Inc.
 *
 * This file is part of Puter.
 *
 * Puter is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/* eslint-disable no-invalid-this */
/* eslint-disable @stylistic/quotes */
import UIContextMenu from '../UIContextMenu.js';

const { html_encode } = window;

// ============================================================
// Mock apps data (used alongside real data for richer display)
// ============================================================
const MOCK_APPS = [
    // Games
    { uuid: 'mock-001', name: 'retro-racer', title: 'Retro Racer', icon: null, category: 'Games' },
    { uuid: 'mock-002', name: 'pixel-puzzle', title: 'Pixel Puzzle', icon: null, category: 'Games' },
    { uuid: 'mock-003', name: 'block-breaker', title: 'Block Breaker', icon: null, category: 'Games' },
    { uuid: 'mock-004', name: 'space-invaders-dx', title: 'Space Invaders DX', icon: null, category: 'Games' },
    { uuid: 'mock-005', name: 'chess-master', title: 'Chess Master', icon: null, category: 'Games' },
    { uuid: 'mock-006', name: 'snake-io', title: 'Snake.io', icon: null, category: 'Games' },
    { uuid: 'mock-007', name: 'sudoku-zen', title: 'Sudoku Zen', icon: null, category: 'Games' },
    { uuid: 'mock-008', name: 'word-hunt', title: 'Word Hunt', icon: null, category: 'Games' },

    // Productivity
    { uuid: 'mock-010', name: 'spreadsheet-pro', title: 'Spreadsheet Pro', icon: null, category: 'Productivity' },
    { uuid: 'mock-011', name: 'task-board', title: 'Task Board', icon: null, category: 'Productivity' },
    { uuid: 'mock-012', name: 'notes-app', title: 'Notes', icon: null, category: 'Productivity' },
    { uuid: 'mock-013', name: 'calendar-app', title: 'Calendar', icon: null, category: 'Productivity' },
    { uuid: 'mock-014', name: 'presentation-maker', title: 'Slides', icon: null, category: 'Productivity' },

    // Photo & Video
    { uuid: 'mock-020', name: 'photo-editor-lite', title: 'Photo Editor Lite', icon: null, category: 'Photo & Video' },
    { uuid: 'mock-021', name: 'screen-recorder', title: 'Screen Recorder', icon: null, category: 'Photo & Video' },
    { uuid: 'mock-022', name: 'gif-maker', title: 'GIF Maker', icon: null, category: 'Photo & Video' },
    { uuid: 'mock-023', name: 'video-converter', title: 'Video Converter', icon: null, category: 'Photo & Video' },

    // Developer Tools
    { uuid: 'mock-030', name: 'json-viewer', title: 'JSON Viewer', icon: null, category: 'Developer Tools' },
    { uuid: 'mock-031', name: 'regex-tester', title: 'Regex Tester', icon: null, category: 'Developer Tools' },
    { uuid: 'mock-032', name: 'api-client', title: 'API Client', icon: null, category: 'Developer Tools' },
    { uuid: 'mock-033', name: 'diff-viewer', title: 'Diff Viewer', icon: null, category: 'Developer Tools' },
    { uuid: 'mock-034', name: 'terminal-app', title: 'Terminal', icon: null, category: 'Developer Tools' },

    // Graphics & Design
    { uuid: 'mock-040', name: 'svg-editor', title: 'SVG Editor', icon: null, category: 'Graphics & Design' },
    { uuid: 'mock-041', name: 'color-picker', title: 'Color Picker', icon: null, category: 'Graphics & Design' },
    { uuid: 'mock-042', name: 'icon-designer', title: 'Icon Designer', icon: null, category: 'Graphics & Design' },
    { uuid: 'mock-043', name: 'wireframe-tool', title: 'Wireframe', icon: null, category: 'Graphics & Design' },

    // Utilities
    { uuid: 'mock-050', name: 'file-converter', title: 'File Converter', icon: null, category: 'Utilities' },
    { uuid: 'mock-051', name: 'password-gen', title: 'Password Generator', icon: null, category: 'Utilities' },
    { uuid: 'mock-052', name: 'qr-code-gen', title: 'QR Code', icon: null, category: 'Utilities' },
    { uuid: 'mock-053', name: 'unit-converter', title: 'Unit Converter', icon: null, category: 'Utilities' },
    { uuid: 'mock-054', name: 'timer-stopwatch', title: 'Timer', icon: null, category: 'Utilities' },

    // Music & Audio
    { uuid: 'mock-060', name: 'music-player', title: 'Music Player', icon: null, category: 'Music & Audio' },
    { uuid: 'mock-061', name: 'audio-recorder', title: 'Audio Recorder', icon: null, category: 'Music & Audio' },
    { uuid: 'mock-062', name: 'beat-maker', title: 'Beat Maker', icon: null, category: 'Music & Audio' },
    { uuid: 'mock-063', name: 'podcast-player', title: 'Podcast Player', icon: null, category: 'Music & Audio' },

    // Business
    { uuid: 'mock-070', name: 'invoice-maker', title: 'Invoice Maker', icon: null, category: 'Business' },
    { uuid: 'mock-071', name: 'crm-lite', title: 'CRM Lite', icon: null, category: 'Business' },
    { uuid: 'mock-072', name: 'analytics-dash', title: 'Analytics', icon: null, category: 'Business' },

    // Entertainment
    { uuid: 'mock-080', name: 'movie-tracker', title: 'Movie Tracker', icon: null, category: 'Entertainment' },
    { uuid: 'mock-081', name: 'book-reader', title: 'Book Reader', icon: null, category: 'Entertainment' },
    { uuid: 'mock-082', name: 'comic-viewer', title: 'Comic Viewer', icon: null, category: 'Entertainment' },

    // Finance
    { uuid: 'mock-090', name: 'budget-tracker', title: 'Budget Tracker', icon: null, category: 'Finance' },
    { uuid: 'mock-091', name: 'expense-log', title: 'Expense Log', icon: null, category: 'Finance' },
    { uuid: 'mock-092', name: 'crypto-watch', title: 'Crypto Watch', icon: null, category: 'Finance' },

    // Education
    { uuid: 'mock-100', name: 'flashcards', title: 'Flashcards', icon: null, category: 'Education' },
    { uuid: 'mock-101', name: 'quiz-maker', title: 'Quiz Maker', icon: null, category: 'Education' },
    { uuid: 'mock-102', name: 'typing-tutor', title: 'Typing Tutor', icon: null, category: 'Education' },
    { uuid: 'mock-103', name: 'math-solver', title: 'Math Solver', icon: null, category: 'Education' },

    // Lifestyle
    { uuid: 'mock-110', name: 'weather-app', title: 'Weather', icon: null, category: 'Lifestyle' },
    { uuid: 'mock-111', name: 'recipe-book', title: 'Recipe Book', icon: null, category: 'Lifestyle' },
    { uuid: 'mock-112', name: 'habit-tracker', title: 'Habit Tracker', icon: null, category: 'Lifestyle' },
    { uuid: 'mock-113', name: 'meditation-app', title: 'Meditation', icon: null, category: 'Lifestyle' },
];

// Client-side category mapping for real recommended apps
const APP_CATEGORIES = {
    // Games
    'shell-shockers-outpan': 'Games',
    'krunker': 'Games',
    'slash-frvr': 'Games',
    'solitaire-frvr': 'Games',
    'tiles-beat': 'Games',
    'basketball-frvr': 'Games',
    'gold-digger-frvr': 'Games',
    'plushie-connect': 'Games',
    'hex-frvr': 'Games',
    'spider-solitaire': 'Games',
    'danger-cross': 'Games',
    'doodle-jump-extra': 'Games',
    'endless-lake': 'Games',
    'sword-and-jewel': 'Games',
    'reversi-2': 'Games',
    'in-orbit': 'Games',
    'bowling-king': 'Games',
    'battleship-war': 'Games',
    'turbo-racing': 'Games',
    'guns-and-bottles': 'Games',
    'jewel-classic': 'Games',

    // Productivity
    'editor': 'Productivity',
    'markus': 'Productivity',
    'grist': 'Productivity',
    'pdf': 'Productivity',
    'silex': 'Productivity',

    // Photo & Video
    'camera': 'Photo & Video',
    'recorder': 'Photo & Video',
    'viewer': 'Photo & Video',
    'player': 'Photo & Video',

    // Developer Tools
    'dev-center': 'Developer Tools',
    'code': 'Developer Tools',
    'judge0': 'Developer Tools',
    'puterjs-playground': 'Developer Tools',
    'tronix': 'Developer Tools',

    // Graphics & Design
    'photopea': 'Graphics & Design',
    'polotno': 'Graphics & Design',

    // Utilities
    'app-center': 'Utilities',
    'calc-hklocykcpts': 'Utilities',

    // Music & Audio
    'virtu-piano': 'Music & Audio',
};

// Categories matching Puter.com marketplace (in order)
const CATEGORY_LIST = [
    'Games',
    'Productivity',
    'Photo & Video',
    'Developer Tools',
    'Graphics & Design',
    'Utilities',
    'Music & Audio',
    'Business',
    'Entertainment',
    'Finance',
    'Education',
    'Lifestyle',
];

const SORT_OPTIONS = [
    { id: 'a-z', label: 'Name (A-Z)' },
    { id: 'z-a', label: 'Name (Z-A)' },
];

const PINNED_APPS_KV_KEY = 'dashboard_pinned_apps';

const icons = {
    sort: `<svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="currentcolor"><path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z"/></svg>`,
    grid: `<svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="currentcolor"><path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z"/></svg>`,
    list: `<svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="currentcolor"><path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"/></svg>`,
    pin: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M16 2a1 1 0 0 1 .7.3l5 5a1 1 0 0 1-.2 1.5l-4.5 3V15a1 1 0 0 1-.3.7l-3 3a1 1 0 0 1-1.7-.7v-5.6L7.4 17a1 1 0 0 1-1.4-1.4l4.6-4.6H5a1 1 0 0 1-.7-1.7l3-3A1 1 0 0 1 8 6h3.2l3-4.5A1 1 0 0 1 15 1h1z"/></svg>`,
    pinSmall: `<svg viewBox="0 0 24 24"><path d="M16 2a1 1 0 0 1 .7.3l5 5a1 1 0 0 1-.2 1.5l-4.5 3V15a1 1 0 0 1-.3.7l-3 3a1 1 0 0 1-1.7-.7v-5.6L7.4 17a1 1 0 0 1-1.4-1.4l4.6-4.6H5a1 1 0 0 1-.7-1.7l3-3A1 1 0 0 1 8 6h3.2l3-4.5A1 1 0 0 1 15 1h1z"/></svg>`,
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    empty: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
};

const TabApps = {
    id: 'apps',
    label: 'My Apps',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,

    // Internal state
    _activeFilter: 'all',
    _pinnedAppUuids: [],
    _$el: null,
    _searchQuery: '',
    _sortMode: 'a-z',
    _allApps: null, // combined real + mock apps

    html () {
        let h = '';
        h += '<div class="springboard-container">';

        // Header (matches Files tab: 94px total, two 47px rows)
        h += '<div class="springboard-header">';

        // Top row: search + action buttons
        h += '<div class="springboard-toolbar">';
        h += '<input type="text" class="springboard-search" placeholder="Search apps...">';
        h += '<div class="springboard-toolbar-actions">';
        h += `<button class="springboard-action-btn springboard-sort-btn" title="Sort" style="position:relative;">${icons.sort}</button>`;
        h += '</div>';
        h += '</div>';

        // Bottom row: category pills
        h += '<div class="springboard-filter-bar">';
        h += '<div class="springboard-filter-bar-scroll">';

        h += '<button class="springboard-filter-pill active" data-filter="all">All</button>';
        h += `<button class="springboard-filter-pill" data-filter="pinned">${icons.pin} Pinned</button>`;
        h += `<button class="springboard-filter-pill" data-filter="recent">${icons.clock} Recent</button>`;
        h += `<button class="springboard-filter-pill" data-filter="my-apps">${icons.code} My Apps</button>`;

        for ( const name of CATEGORY_LIST ) {
            h += `<button class="springboard-filter-pill" data-filter="category:${html_encode(name)}">${html_encode(name)}</button>`;
        }

        h += '</div>'; // filter-bar-scroll
        h += '</div>'; // filter-bar

        h += '</div>'; // header

        // App grid area
        h += '<div class="springboard-grid-container">';
        h += '<div class="springboard-grid"></div>';
        h += `<div class="springboard-empty" style="display:none;">
            ${icons.empty}
            <p class="springboard-empty-title">No apps found</p>
            <span class="springboard-empty-subtitle">Try a different category</span>
        </div>`;
        h += '</div>'; // grid-container

        h += '</div>'; // springboard-container
        return h;
    },

    init ($el_window) {
        this._$el = $el_window;

        // Load pinned apps, then load initial view
        this._loadPinnedApps().then(() => {
            this._loadFilteredApps(this._activeFilter);
        });

        // Search input handler
        let searchTimeout;
        $el_window.on('input', '.springboard-search', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this._searchQuery = $(e.target).val().trim().toLowerCase();
                this._loadFilteredApps(this._activeFilter);
            }, 150);
        });

        // Filter pill click handler
        $el_window.on('click', '.springboard-filter-pill', (e) => {
            const $pill = $(e.currentTarget);
            const filter = $pill.attr('data-filter');

            $el_window.find('.springboard-filter-pill').removeClass('active');
            $pill.addClass('active');

            this._activeFilter = filter;
            this._loadFilteredApps(filter);
        });

        // Sort button handler
        $el_window.on('click', '.springboard-sort-btn', (e) => {
            e.stopPropagation();
            const $btn = $(e.currentTarget);

            // Close existing sort menu
            $el_window.find('.springboard-sort-menu').remove();

            let menuHtml = '<div class="springboard-sort-menu">';
            for ( const opt of SORT_OPTIONS ) {
                menuHtml += `<div class="springboard-sort-option${opt.id === this._sortMode ? ' active' : ''}" data-sort="${opt.id}">${opt.label}</div>`;
            }
            menuHtml += '</div>';

            $btn.append(menuHtml);

            // Close on click outside
            const closeMenu = () => {
                $el_window.find('.springboard-sort-menu').remove();
                $(document).off('click.springboard-sort');
            };
            setTimeout(() => {
                $(document).on('click.springboard-sort', closeMenu);
            }, 0);
        });

        // Sort option click
        $el_window.on('click', '.springboard-sort-option', (e) => {
            e.stopPropagation();
            this._sortMode = $(e.currentTarget).attr('data-sort');
            $el_window.find('.springboard-sort-menu').remove();
            $(document).off('click.springboard-sort');
            this._loadFilteredApps(this._activeFilter);
        });

        // App click handler — open in new browser tab
        $el_window.on('click', '.springboard-grid .springboard-app', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const appName = $(this).attr('data-app-name');
            if ( appName ) {
                window.open(`/app/${appName}`, '_blank');
            }
        });

        // Right-click context menu for pin/unpin
        $el_window.on('contextmenu', '.springboard-grid .springboard-app', (e) => {
            e.preventDefault();
            const $app = $(e.currentTarget);
            const appUuid = $app.attr('data-app-uuid');
            const appName = $app.attr('data-app-name');
            const isPinned = this._pinnedAppUuids.includes(appUuid);

            UIContextMenu({
                items: [
                    {
                        html: isPinned ? 'Unpin App' : 'Pin App',
                        onClick: () => {
                            this._togglePin(appUuid);
                        },
                    },
                    '-',
                    {
                        html: 'Open in New Tab',
                        onClick: () => {
                            window.open(`/app/${appName}`, '_blank');
                        },
                    },
                ],
                position: { left: e.pageX, top: e.pageY },
            });
        });
    },

    async _loadPinnedApps () {
        try {
            const stored = await puter.kv.get(PINNED_APPS_KV_KEY);
            this._pinnedAppUuids = stored ? JSON.parse(stored) : [];
        } catch (e) {
            this._pinnedAppUuids = [];
        }
    },

    async _togglePin (appUuid) {
        const idx = this._pinnedAppUuids.indexOf(appUuid);
        if ( idx >= 0 ) {
            this._pinnedAppUuids.splice(idx, 1);
        } else {
            this._pinnedAppUuids.push(appUuid);
        }
        await puter.kv.set(PINNED_APPS_KV_KEY, JSON.stringify(this._pinnedAppUuids));

        // Re-render current view to update pin badges
        this._loadFilteredApps(this._activeFilter);
    },

    async _ensureAppsLoaded () {
        if ( this._allApps ) return;

        // Fetch real apps
        let realApps = [];
        if ( ! window.launch_apps?.recommended ) {
            try {
                window.launch_apps = await $.ajax({
                    url: `${window.api_origin}/get-launch-apps?icon_size=64`,
                    type: 'GET',
                    contentType: 'application/json',
                    headers: { 'Authorization': `Bearer ${window.auth_token}` },
                });
            } catch (e) {
                console.error('Failed to load launch apps:', e);
            }
        }
        realApps = (window.launch_apps?.recommended || []).map(app => ({
            ...app,
            category: APP_CATEGORIES[app.name] || 'Utilities',
            isMock: false,
        }));

        // Combine with mock apps (using default icon for mocks)
        const mockApps = MOCK_APPS.map(app => ({
            ...app,
            icon: app.icon || window.icons['app.svg'],
            isMock: true,
        }));

        this._allApps = [...realApps, ...mockApps];
    },

    async _loadFilteredApps (filter) {
        if ( ! this._$el ) return;
        const $grid = this._$el.find('.springboard-grid');
        const $empty = this._$el.find('.springboard-empty');

        $grid.html('<div class="springboard-loading">Loading...</div>');
        $empty.hide();

        await this._ensureAppsLoaded();

        let apps = [];

        try {
            if ( filter === 'all' ) {
                apps = this._allApps;
            } else if ( filter === 'pinned' ) {
                await this._loadPinnedApps();
                const pinnedSet = new Set(this._pinnedAppUuids);
                apps = this._allApps.filter(app => pinnedSet.has(app.uuid));
            } else if ( filter === 'recent' ) {
                apps = await this._fetchRecentApps();
            } else if ( filter === 'my-apps' ) {
                apps = await this._fetchMyApps();
            } else if ( filter.startsWith('category:') ) {
                const categoryName = filter.slice('category:'.length);
                apps = this._allApps.filter(app => app.category === categoryName);
            }
        } catch (e) {
            console.error('Failed to load apps for filter:', filter, e);
        }

        // Apply search filter
        if ( this._searchQuery ) {
            apps = apps.filter(app => {
                return app.title.toLowerCase().includes(this._searchQuery) ||
                    app.name.toLowerCase().includes(this._searchQuery);
            });
        }

        // Apply sort
        apps = [...apps];
        if ( this._sortMode === 'a-z' ) {
            apps.sort((a, b) => a.title.localeCompare(b.title));
        } else if ( this._sortMode === 'z-a' ) {
            apps.sort((a, b) => b.title.localeCompare(a.title));
        }

        if ( apps.length === 0 ) {
            $grid.empty();
            $empty.show();

            if ( this._searchQuery ) {
                $empty.find('.springboard-empty-title').text('No apps match your search');
                $empty.find('.springboard-empty-subtitle').text('Try a different search term');
            } else if ( filter === 'pinned' ) {
                $empty.find('.springboard-empty-title').text('No pinned apps');
                $empty.find('.springboard-empty-subtitle').text('Right-click any app to pin it here');
            } else if ( filter === 'recent' ) {
                $empty.find('.springboard-empty-title').text('No recent apps');
                $empty.find('.springboard-empty-subtitle').text('Apps you open will appear here');
            } else if ( filter === 'my-apps' ) {
                $empty.find('.springboard-empty-title').text('No apps yet');
                $empty.find('.springboard-empty-subtitle').text('Visit Dev Center to create your first app');
            } else if ( filter.startsWith('category:') ) {
                $empty.find('.springboard-empty-title').text('No apps in this category');
                $empty.find('.springboard-empty-subtitle').text('Try a different category');
            } else {
                $empty.find('.springboard-empty-title').text('No apps available');
                $empty.find('.springboard-empty-subtitle').text('');
            }
            return;
        }

        $empty.hide();
        $grid.html(this._renderAppsGrid(apps));
    },

    _renderAppsGrid (apps) {
        let h = '';
        for ( const app of apps ) {
            const isPinned = this._pinnedAppUuids.includes(app.uuid);
            h += `<div class="springboard-app${isPinned ? ' is-pinned' : ''}"
                       data-app-name="${html_encode(app.name)}"
                       data-app-uuid="${html_encode(app.uuid)}"
                       title="${html_encode(app.title)}">`;
            h += '<div class="springboard-app-icon-wrapper">';
            h += `<img class="springboard-app-icon" src="${html_encode(app.icon || window.icons['app.svg'])}" loading="lazy">`;
            if ( isPinned ) {
                h += `<div class="springboard-pin-badge">${icons.pinSmall}</div>`;
            }
            h += '</div>';
            h += `<span class="springboard-app-title">${html_encode(app.title)}</span>`;
            h += '</div>';
        }
        return h;
    },

    async _fetchRecentApps () {
        if ( ! window.launch_apps?.recent ) {
            try {
                window.launch_apps = await $.ajax({
                    url: `${window.api_origin}/get-launch-apps?icon_size=64`,
                    type: 'GET',
                    contentType: 'application/json',
                    headers: { 'Authorization': `Bearer ${window.auth_token}` },
                });
            } catch (e) {
                console.error('Failed to load recent apps:', e);
                return [];
            }
        }
        return (window.launch_apps.recent || []).map(app => ({
            ...app,
            category: APP_CATEGORIES[app.name] || 'Utilities',
            isMock: false,
        }));
    },

    async _fetchMyApps () {
        try {
            const apps = await $.ajax({
                url: `${window.api_origin}/apps`,
                type: 'GET',
                contentType: 'application/json',
                headers: { 'Authorization': `Bearer ${window.auth_token}` },
            });
            return apps.map(app => ({
                uuid: app.uid,
                name: app.name,
                title: app.title,
                icon: app.icon || window.icons['app.svg'],
                category: 'Developer Tools',
                isMock: false,
            }));
        } catch (e) {
            console.error('Failed to fetch my apps:', e);
            return [];
        }
    },

    onActivate ($el_window) {
        this._$el = $el_window;
        this._loadPinnedApps().then(() => {
            this._loadFilteredApps(this._activeFilter);
        });
    },
};

export default TabApps;
