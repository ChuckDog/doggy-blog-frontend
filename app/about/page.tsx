export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">关于我们</h1>
          <p className="text-xl text-gray-600">
            一群热爱狗狗的朋友，分享养狗路上的点点滴滴
          </p>
        </div>

        {/* 主要内容区域 */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* 团队介绍 */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              我们的故事
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                狗狗日记诞生于2024年初，源于一群爱狗人士想要分享养狗经验和记录美好时光的愿望。
                我们相信，每一只狗狗都有自己独特的故事，每一次与主人的互动都值得被珍藏。
              </p>
              <p className="mb-4">
                从最初的小范围朋友圈分享，到现在拥有数百篇原创文章的博客平台，
                我们始终坚持用心记录每一个细节，用文字传递温暖与感动。
              </p>
              <p>
                无论是新手铲屎官还是资深养狗达人，都能在这里找到有用的信息和共鸣。
                我们希望通过这个平台，让更多人了解狗狗、爱护狗狗，共同营造一个人宠和谐的美好世界。
              </p>
            </div>
          </div>

          {/* 使命愿景 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                我们的使命
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">✓</span>
                  <span>传播科学的养狗知识</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">✓</span>
                  <span>分享真实的养狗体验</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">✓</span>
                  <span>建立爱狗人士交流社区</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">✓</span>
                  <span>推广负责任的养宠理念</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-3">✨</span>
                我们的愿景
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">✓</span>
                  <span>成为最受欢迎的狗狗内容平台</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">✓</span>
                  <span>帮助千万家庭科学养狗</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">✓</span>
                  <span>推动人宠和谐共处的社会氛围</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2 mt-1">✓</span>
                  <span>创造更多狗狗与人类的美好回忆</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 团队成员 */}
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">核心团队</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  王
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">小王</h4>
                <p className="text-gray-600 text-sm mb-3">创始人 & 主编</p>
                <p className="text-gray-500 text-sm">
                  5年养狗经验，金毛犬主人，负责内容策划和团队管理
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  李
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">李明</h4>
                <p className="text-gray-600 text-sm mb-3">训犬专家</p>
                <p className="text-gray-500 text-sm">
                  专业训犬师，3年教学经验，提供训练指导和行为咨询
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  张
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">张医生</h4>
                <p className="text-gray-600 text-sm mb-3">宠物营养师</p>
                <p className="text-gray-500 text-sm">
                  兽医背景，专注宠物营养学研究，提供健康饮食建议
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            联系我们
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-semibold text-gray-900 mb-2">邮箱联系</h3>
              <p className="text-gray-600">contact@doggydiary.com</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-semibold text-gray-900 mb-2">微信交流</h3>
              <p className="text-gray-600">扫描二维码加入群聊</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-semibold text-gray-900 mb-2">线下聚会</h3>
              <p className="text-gray-600">定期举办狗狗主题活动</p>
            </div>
          </div>
        </div>

        {/* 底部鼓励语 */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-3">🐾 加入我们的狗狗大家庭</h3>
            <p className="text-lg opacity-90">
              无论你是新手铲屎官还是资深狗爸狗妈，这里都欢迎你的到来！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
