import React, { useState } from 'react';
import { MessageSquare, Users, Settings, Send, Plus, LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

interface Group {
  id: string;
  name: string;
  imageUrl: string;
  memberCount: number;
  lastMessage?: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Company Updates',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60',
      memberCount: 145,
      lastMessage: 'New project announcement coming soon!'
    },
    {
      id: '2',
      name: 'Customer Notifications',
      imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=60',
      memberCount: 892,
      lastMessage: 'Service maintenance scheduled for next week'
    },
    {
      id: '3',
      name: 'Team Alpha',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60',
      memberCount: 23,
      lastMessage: 'Great work everyone on the latest release!'
    }
  ]);

  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Pass Note</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="h-6 w-6 text-gray-600" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <LogOut className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Groups</h2>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Plus className="h-5 w-5 text-indigo-600" />
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedGroup(group)}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={group.imageUrl}
                        alt={group.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {group.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {group.memberCount} members
                        </p>
                      </div>
                    </div>
                    {group.lastMessage && (
                      <p className="mt-2 text-sm text-gray-600 truncate">
                        {group.lastMessage}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            {selectedGroup ? (
              <div className="bg-white rounded-lg shadow h-[calc(100vh-12rem)]">
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedGroup.imageUrl}
                      alt={selectedGroup.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {selectedGroup.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {selectedGroup.memberCount} members
                      </p>
                    </div>
                  </div>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Users className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                <div className="p-4 h-[calc(100%-8rem)] overflow-y-auto">
                  <div className="space-y-4">
                    {/* Messages will be implemented here */}
                  </div>
                </div>

                <div className="p-4 border-t">
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
                      <Send className="h-5 w-5" />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow h-[calc(100vh-12rem)] flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto" />
                  <p className="mt-2 text-gray-500">Select a group to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;