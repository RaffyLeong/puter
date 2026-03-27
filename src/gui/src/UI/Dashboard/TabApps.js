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
import launch_app from '../helpers/launch_app.js';

const { html_encode } = window;

const mockApps = ["app-0b37f054-07d4-4627-8765-11bd23e889d4", "app-5584fbf7-ed69-41fc-99cd-85da21b1ef51", "app-838dfbc4-bf8b-48c2-b47b-c4adc77fab58", "app-7bdca1a4-6373-4c98-ad97-03ff2d608ca1", "app-3920851d-bda8-479b-9407-8517293c7d44", "app-7870be61-8dff-4a99-af64-e9ae6811e367", "app-11edfba2-1ed3-4e22-8573-47e88fb87d70"];

const SORT_OPTIONS = [
    { id: 'a-z', label: 'Name (A-Z)' },
    { id: 'z-a', label: 'Name (Z-A)' },
    { id: 'recent', label: 'Recently Used' },
    { id: 'date-added', label: 'Date Added' },
];

const icons = {
    sort: `<svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="currentcolor"><path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z"/></svg>`,
    empty: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
};

const TabApps = {
    id: 'apps',
    label: 'Apps',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,

    _$el: null,
    _searchQuery: '',
    _sortMode: 'a-z',
    _apps: null,
    _recentNames: null,

    html () {
        let h = '';
        h += '<div class="springboard-container">';

        h += '<div class="springboard-header">';
        h += '<div class="springboard-toolbar">';
        h += '<input type="text" class="springboard-search" placeholder="Search apps...">';
        h += '<div class="springboard-toolbar-actions">';
        h += `<button class="springboard-action-btn springboard-sort-btn" title="Sort" style="position:relative;">${icons.sort}</button>`;
        h += '</div>';
        h += '</div>';
        h += '</div>';

        h += '<div class="springboard-grid-container">';
        h += '<div class="springboard-grid"></div>';
        h += `<div class="springboard-empty" style="display:none;">
            ${icons.empty}
            <p class="springboard-empty-title">No apps installed yet</p>
            <span class="springboard-empty-subtitle"></span>
        </div>`;
        h += '</div>';

        h += '</div>';
        return h;
    },

    init ($el_window) {
        this._$el = $el_window;

        this._loadApps();

        // Search input handler
        let searchTimeout;
        $el_window.on('input', '.springboard-search', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this._searchQuery = $(e.target).val().trim().toLowerCase();
                this._renderApps();
            }, 150);
        });

        // Sort button handler
        $el_window.on('click', '.springboard-sort-btn', (e) => {
            e.stopPropagation();
            const $btn = $(e.currentTarget);

            $el_window.find('.springboard-sort-menu').remove();

            let menuHtml = '<div class="springboard-sort-menu">';
            for ( const opt of SORT_OPTIONS ) {
                menuHtml += `<div class="springboard-sort-option${opt.id === this._sortMode ? ' active' : ''}" data-sort="${opt.id}">${opt.label}</div>`;
            }
            menuHtml += '</div>';

            $btn.append(menuHtml);

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
            this._renderApps();
        });

        // App click handler
        $el_window.on('click', '.springboard-grid .springboard-app', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const appName = $(this).attr('data-app-name');
            if ( appName ) {
                launch_app({ name: appName });
            }
        });

        // Right-click context menu
        $el_window.on('contextmenu', '.springboard-grid .springboard-app', (e) => {
            e.preventDefault();
            const $app = $(e.currentTarget);
            const appName = $app.attr('data-app-name');

            UIContextMenu({
                items: [
                    {
                        html: 'Open App',
                        onClick: () => {
                            launch_app({ name: appName });
                        },
                    },
                ],
                position: { left: e.pageX, top: e.pageY },
            });
        });
    },

    async _loadApps () {
        if ( ! this._$el ) return;
        const $grid = this._$el.find('.springboard-grid');
        $grid.html('<div class="springboard-loading">Loading...</div>');

        try {
            if ( ! window.launch_apps?.recommended ) {
                window.launch_apps = await $.ajax({
                    url: `${window.api_origin}/get-launch-apps?icon_size=64`,
                    type: 'GET',
                    contentType: 'application/json',
                    headers: { 'Authorization': `Bearer ${window.auth_token}` },
                });
            }

            const recommended = window.launch_apps?.recommended || [];
            const mockSet = new Set(mockApps);
            this._apps = recommended.filter(app =>
                mockSet.has(app.uid) || mockSet.has(app.uuid));

            this._recentNames = (window.launch_apps?.recent || []).map(app => app.name);
        } catch (e) {
            console.error('Failed to load apps:', e);
            this._apps = [];
            this._recentNames = [];
        }

        this._renderApps();
    },

    _renderApps () {
        if ( !this._$el || !this._apps ) return;
        const $grid = this._$el.find('.springboard-grid');
        const $empty = this._$el.find('.springboard-empty');

        let apps = [...this._apps];

        // Apply search filter
        if ( this._searchQuery ) {
            apps = apps.filter(app => {
                return (app.title || '').toLowerCase().includes(this._searchQuery) ||
                    (app.name || '').toLowerCase().includes(this._searchQuery);
            });
        }

        // Apply sort
        if ( this._sortMode === 'a-z' ) {
            apps.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        } else if ( this._sortMode === 'z-a' ) {
            apps.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
        } else if ( this._sortMode === 'recent' ) {
            const recentIndex = {};
            if ( this._recentNames ) {
                this._recentNames.forEach((name, i) => {
                    recentIndex[name] = i;
                });
            }
            apps.sort((a, b) => {
                const ai = recentIndex[a.name] ?? Infinity;
                const bi = recentIndex[b.name] ?? Infinity;
                return ai - bi;
            });
        }
        // 'date-added' keeps the original API order (no sort needed)

        if ( apps.length === 0 ) {
            $grid.empty();
            $empty.show();

            if ( this._searchQuery ) {
                $empty.find('.springboard-empty-title').text('No apps match your search');
                $empty.find('.springboard-empty-subtitle').text('Try a different search term');
            } else {
                $empty.find('.springboard-empty-title').text('No apps installed yet');
                $empty.find('.springboard-empty-subtitle').text('');
            }
            return;
        }

        $empty.hide();

        let h = '';
        for ( const app of apps ) {
            h += `<div class="springboard-app"
                       data-app-name="${html_encode(app.name)}"
                       data-app-uuid="${html_encode(app.uuid || '')}"
                       title="${html_encode(app.title || app.name)}">`;
            h += '<div class="springboard-app-icon-wrapper">';
            h += `<img class="springboard-app-icon" src="${html_encode(app.icon || window.icons['app.svg'])}" loading="lazy">`;
            h += '</div>';
            h += `<span class="springboard-app-title">${html_encode(app.title || app.name)}</span>`;
            h += '</div>';
        }
        $grid.html(h);
    },

    onActivate ($el_window) {
        this._$el = $el_window;
        this._loadApps();
    },
};

export default TabApps;
